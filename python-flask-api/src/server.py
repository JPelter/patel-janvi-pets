# STL
from os import environ

# EXT
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from waitress import serve

from sqlalchemy import and_, asc, create_engine, inspect, or_
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func

from flask import Flask, session
################################
#### INT AND COMMON OBJECTS ####
################################
app = Flask(__name__)
CORS(app) # REMOVE BEFORE PROD LAUNCH? OR WHO CARES?
app.secret_key = environ['FLASK_SECRET']
db = SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://postgres:{environ['POSTGRES_PASSWORD']}@{environ['POSTGRES_HOST']}"

db_engine = create_engine(f"postgresql://postgres:{environ['POSTGRES_PASSWORD']}@{environ['POSTGRES_HOST']}")
db_Base = automap_base()
db_Base.prepare(db_engine)

ACCOUNT = db_Base.classes.account

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
        return jsonify({"message":"Still alive!"})
    
    @app.route("/api/authcheck", methods=['GET'])
    @login_required(admin_endpoint=False) # EXAMPLE OF HOW TO USE THE LOGIN REQUIRED DECOCATOR! OPTIONAL ARGUMENT, DEFAULT IS False!
    def authcheck_endpoint():
        return jsonify({"message":"Authenticated!", "email":session['email'], "session_start":session['creation_time']})
        
    @app.route("/api/admincheck", methods=['GET'])
    @login_required(admin_endpoint=True) # EXAMPLE OF HOW TO MAKE ADMIN ENDPOINT!
    def admincheck_endpoint():
        return jsonify({"message":"Admin!", "email":session['email'], "session_start":session['creation_time']})

    db.init_app(app)
    print("Starting server!")
    serve(app, host='0.0.0.0', port=8080)