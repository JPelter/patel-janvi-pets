# STL
from os import environ

# EXT
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

from waitress import serve

from sqlalchemy import and_, asc, create_engine, inspect, or_
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func

from flask import Flask, session
########################
#### COMMON OBJECTS ####
########################
app = Flask(__name__)
app.secret_key = environ['FLASK_SECRET']
db = SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://postgres:{environ['POSTGRES_PASSWORD']}@{environ['POSTGRES_HOST']}"

db_engine = create_engine(f"postgresql://postgres:{environ['POSTGRES_PASSWORD']}@{environ['POSTGRES_HOST']}")
db_Base = automap_base()
db_Base.prepare(db_engine)

# JUST A RENAMING I LIKE, NOT SURE THAT I LOVE
ACCOUNT = db_Base.classes.account

# TODO: LOGIN ROLE REQUIRED DECORATOR

##################################
##### IMPORTED SERVER ROUTES #####
##################################
from auth_routes import *

########################
###### STARTUP!!! ######
########################
if __name__ == '__main__':
    @app.route("/api/health", methods=['GET'])
    def healthcheck_endpoint():
        current_accounts = db.session.query(ACCOUNT).count()
        print(f"Someone checked the health endpoint when there was {current_accounts} accounts!")
        return jsonify({"message":"Still alive!", "accounts":current_accounts})
    
    @app.route("/api/auth", methods=['GET'])
    @login_required() # EXAMPLE OF HOW TO USE THE LOGIN REQUIRED DECOCATOR! OPTIONAL STRING ARGUMENT TO SPECIFY ROLE!
    def authcheck_endpoint(role_required=None):
        print(f"Someone checked the authcheck endpoint!")
        if session.get('email'):
            return jsonify({"message":"Authenticated!", "email":session['email'], "session_start":session['creation_time']})
        else:
            return jsonify({"message":"Not authenticated!"}), 403
    db.init_app(app)
    print("Starting server!")
    serve(app, host='0.0.0.0', port=8080)
