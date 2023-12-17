# STL
from datetime import datetime, timedelta
import random
import secrets
import string

# AUTH
from flask import jsonify, request
from server import app, db, ACCOUNT

login_token_minutes = 15

@app.route("/api/login-token", methods=['GET'])
def token_request_endpoint():
    # QUERY FOR ACCOUNT OBJECT ON EMAIL
    req_acct = db.session.query(ACCOUNT).get(request.json["email"])
    new_token = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(6))
    if not req_acct: # HANDLE CASE WHEN ACCOUNT DOESN'T EXIST YET!
        req_acct = ACCOUNT(email=request.json["email"], login_token=new_token)
        db.session.add(req_acct)
    else:
        ### PROTECTION AGAINST BRUTE FORCE TOKEN CRACKING!
        if datetime.utcnow() < req_acct.request_time + timedelta(minutes=login_token_minutes): # IF IT HAS BEEN LESS THAN 15 MINUTES SINCE LAST REQUEST TIME
            if req_acct.recent_request_counter > 3: # AND IF THE USER HAS RECENTLY REQUESTED MORE THAN 3 TOKENS!
                # DON'T DO ANYTHING! WE MIGHT BE UNDER ATTACK!
                return jsonify({"message":f"Try again after {login_token_minutes} minutes!"}), 429 # HTTP CODE FOR RATE LIMITING
        else: # IF MORE THAN 15 MINUTES HAVE PASSED SINCE LAST REQUEST, RESET COUNTER TO 0!
            req_acct.recent_request_counter = 0

        # FINALLY UPDATE REQUEST TIME AND COUNTER, SET THE NEW TOKEN!
        req_acct.request_time = datetime.utcnow()
        req_acct.recent_request_counter = req_acct.recent_request_counter + 1
        req_acct.login_token = new_token
        

    db.session.commit()
    # TODO: SEND EMAIL WITH TOKEN!

    return