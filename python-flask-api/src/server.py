# STL
import logging
from os import environ

# EXT
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from waitress import serve

from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base

from flask import Flask, session
################################
#### INT AND COMMON OBJECTS ####
################################
app = Flask(__name__)
app.logger.setLevel(logging.INFO) # TWO LOGGERS :?
if environ['POSTGRES_HOST'].startswith("localhost"): # ON LOCAL, 
    CORS(app, supports_credentials=True) # IF RUNNING API AND FRONTEND REACT, DIFFERENT PORT IS CORS!
    app.logger.setLevel(logging.DEBUG)

app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = environ['FLASK_SECRET']

db = SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://postgres:{environ['POSTGRES_PASSWORD']}@{environ['POSTGRES_HOST']}"

db_engine = create_engine(f"postgresql://postgres:{environ['POSTGRES_PASSWORD']}@{environ['POSTGRES_HOST']}")
db_Base = automap_base()
db_Base.prepare(db_engine)

ACCOUNT = db_Base.classes.account
APPOINTMENT_REQUEST = db_Base.classes.appointment_request
APPOINTMENT = db_Base.classes.appointment

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

##################################
##### IMPORTED SERVER ROUTES #####
##################################
from auth_routes import *
from appointment_routes import *

########################
###### STARTUP!!! ######
########################
if __name__ == '__main__':
    @app.route("/api/health", methods=['GET'])
    def healthcheck_endpoint():
        return jsonify({"message":"Still alive!"})
    
    @app.route("/api/authcheck", methods=['GET'])
    @login_required(admin_endpoint=False) # EXAMPLE OF HOW TO USE THE LOGIN REQUIRED DECOCATOR! OPTIONAL ARGUMENT, DEFAULT IS False!
    def authcheck_endpoint():
        app.logger.info(f"Authcheck by: {session['email']}|{session['user_uuid']}")
        return jsonify({"message":"Authenticated!", "email":session['email'], "session_start":session['creation_time']})
        
    @app.route("/api/admincheck", methods=['GET'])
    @login_required(admin_endpoint=True) # EXAMPLE OF HOW TO MAKE ADMIN ENDPOINT!
    def admincheck_endpoint():
        app.logger.info(f"Admincheck by:  {session['email']}|{session['user_uuid']}")
        return jsonify({"message":"Admin!", "email":session['email'], "session_start":session['creation_time']})

    db.init_app(app)
    app.logger.info("Starting server!")
    serve(app, host='0.0.0.0', port=8080)