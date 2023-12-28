# STL
from datetime import datetime, timedelta, timezone
from functools import partial, wraps
import random
from email.message import EmailMessage
from os import environ
import secrets
import smtplib
import string

# AUTH
from flask import jsonify, request, session
from server import app, db, ACCOUNT

login_token_minutes = 15 # TIME FOR TOKEN TO EXPIRE AND TOKEN REQUEST RATE LIMIT TIME

@app.route("/api/login-token-email", methods=['POST'])
def token_request_endpoint():
    # QUERY FOR ACCOUNT OBJECT ON EMAIL
    app.logger.info(f"Login token email request for: {request.get_json()['email']}")
    req_acct = db.session.query(ACCOUNT).filter(ACCOUNT.email == request.get_json()['email']).first()
    new_token = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(6))
    if not req_acct: # HANDLE CASE WHEN ACCOUNT DOESN'T EXIST YET!
        req_acct = ACCOUNT(email=request.get_json()["email"], login_token=new_token)
        db.session.add(req_acct)
        app.logger.info(f"Created ACCOUNT for: {request.get_json()['email']}")
    else:
        ### PROTECTION AGAINST SPAM TOKEN CREATION AND EMAIL SEND!
        if datetime.now(timezone.utc) < req_acct.request_time + timedelta(minutes=login_token_minutes): # IF IT HAS BEEN LESS THAN 15 MINUTES SINCE LAST REQUEST TIME
            if req_acct.recent_request_counter > 3: # AND IF THE USER HAS RECENTLY REQUESTED MORE THAN 3 TOKENS!
                # DON'T DO ANYTHING! WE MIGHT BE UNDER ATTACK!
                app.logger.info(f"Too many token email requests for: {request.get_json()['email']}")
                return jsonify({"message":f"Try again after {login_token_minutes} minutes!"}), 429 # HTTP CODE FOR RATE LIMITING
        else: # IF MORE THAN 15 MINUTES HAVE PASSED SINCE LAST REQUEST, RESET COUNTER TO 0!
            req_acct.recent_request_counter = 0

        # FINALLY UPDATE REQUEST TIME AND COUNTER, SET THE NEW TOKEN!
        req_acct.request_time = datetime.now(timezone.utc)
        req_acct.recent_request_counter = req_acct.recent_request_counter + 1
        req_acct.login_token = new_token
        app.logger.info(f"Token generated for: {request.get_json()['email']}")

    db.session.commit()
    # NOW WE SEND USER THE EMAIL CONTAINING THEIR LOGIN TOKEN!
    msg = EmailMessage()
    msg.set_content(f"Hello,\n\nHere is your login token:\n\n\t\t{new_token}\n\nThanks,\nPets Team")

    msg['Subject'] = "Pets Login Token!"
    msg['From'] = environ["SENDER_EMAIL"]
    msg['To'] = request.get_json()["email"]

    s = smtplib.SMTP(environ['SMTP_RELAY'], 587, timeout=15) # try ports 25, 465, 587
    s.starttls()
    s.login(environ["EMAIL_ACCOUNT"], environ["EMAIL_PASSWORD"])
    s.send_message(msg)
    s.quit()
    app.logger.info(f"Token emailed for: {request.get_json()['email']}")
    return jsonify({"message":"Login token sent to email!", "email":request.get_json()["email"]})

@app.route("/api/login-token-exchange", methods=['POST'])
def token_post_endpoint():
    app.logger.info(f"Token exchange request for: {request.get_json()['email']} with token: {request.get_json()['login_token']}")
    req_acct = db.session.query(ACCOUNT).filter(ACCOUNT.email == request.get_json()["email"]).first()
    if datetime.now(timezone.utc) < req_acct.request_time + timedelta(minutes=login_token_minutes) and req_acct.login_token == request.get_json()["login_token"]:
        session['email'] = request.get_json()["email"]
        session['creation_time'] = datetime.now(timezone.utc)
        session['user_uuid'] = req_acct.uuid
        req_acct.last_successful_login = session['creation_time']
        app.logger.info(f"Created session cookie for: {request.get_json()['email']}")
        return jsonify({"message":"Token exchanged for authenticating session cookie!", "email":request.get_json()["email"]})
    else:
        app.logger.info(f"No session cookie for: {request.get_json()['email']}")
        return jsonify({"message":"Expired or incorrect token!", "email":request.get_json()["email"]}), 403
    
@app.route("/api/logout", methods=['GET'])
def logout_endpoint():
    session.clear()
    # TODO MAKE IT POSSIBLE TO EXPIRE EXISTING SESSIONS FROM ALL OTHER DEVICES (BY SETTING A LOGOUT TIME IN ACCOUNT?)
    return jsonify({"message":"Session cookie cleared!"})

def login_required(admin_endpoint=False):
    def decorator(function_to_protect):
        @wraps(function_to_protect)
        def wrapper(*args, **kwargs):
            app.logger.debug(f"login_required API call")
            if session.get('email'):
                req_acct = db.session.query(ACCOUNT).filter(ACCOUNT.email == session["email"]).first()
                if admin_endpoint and not req_acct.admin_account:
                    return jsonify({"message":"Not authorized sorry!"}), 403
                else:
                    return function_to_protect(*args, **kwargs)
            else:
                return jsonify({"message":"Try logging in!"}), 401
        return wrapper
    return decorator