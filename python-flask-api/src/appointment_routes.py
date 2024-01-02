# STL
from datetime import datetime, timedelta, timezone
import random
from os import environ
import string

# EXT
from flask import jsonify, request, session

# AUTH
from server import app, db, login_required, ACCOUNT, APPOINTMENT_REQUEST, APPOINTMENT

##########################
### APPT REQ ENDPOINTS ###
##########################
@app.route("/api/request-appointment", methods=['POST'])
@login_required()
def create_request():
    req_acct = db.session.query(ACCOUNT).get(session['user_uuid'])
    # appt_req = APPOINTMENT_REQUEST(customer_uuid=req_acct.uuid, window_start=request.get_json()['window_start'], window_end=request.get_json()['window_end'],
    #                     service_requested=request.get_json()['service_requested'])
    # ADD OPTIONAL FIELDS IF PRESENT!
    if 'request_note' in request.get_json():
        pass
    if 'recurring_weekly' in request.get_json():
        pass
    if 'recurring_enddate' in request.get_json():
        pass
    return jsonify({"message":"todo"})

@app.route("/api/request-appointment", methods=['GET'])
@login_required()
def get_request():

    return jsonify({"message":"todo"})

#ADMIN ROUTES
@app.route("/api/admin/request-appointment", methods=['GET'])
@login_required(admin_endpoint=True)
def admin_get_request():

    return jsonify({"message":"todo"})

@app.route("/api/admin/request-appointment", methods=['POST'])
@login_required(admin_endpoint=True)
def admin_resolve_request():

    return jsonify({"message":"todo"})

######################
### APPT ENDPOINTS ###
######################
@app.route("/api/appointment", methods=['GET'])
@login_required()
def get_appointment():

    return jsonify({"message":"todo"})

@app.route("/api/appointment", methods=['DELETE'])
@login_required()
def cancel_appointment():

    return jsonify({"message":"todo"})

@app.route("/api/admin/appointment", methods=['GET'])
@login_required(admin_endpoint=True)
def admin_get_appointment():

    return jsonify({"message":"todo"})

@app.route("/api/admin/appointment", methods=['DELETE'])
@login_required(admin_endpoint=True)
def admin_delete_appointment():

    return jsonify({"message":"todo"})

@app.route("/api/admin/appointment", methods=['POST'])
@login_required(admin_endpoint=True)
def admin_resolve_appointment():

    return jsonify({"message":"todo"})