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
    # MANDATORY FIELDS!
    app.logger.debug(f"Got request for appointments with JSON:\n{request.get_json()}")
    appt_req = APPOINTMENT_REQUEST(customer_uuid=req_acct.uuid, target_time=request.get_json()['target_time'], service_requested=request.get_json()['service_requested'])
    # ADD OPTIONAL FIELDS IF PRESENT!
    if 'request_note' in request.get_json():
        appt_req.request_note = request.get_json()['request_note']
    if 'recurring_weekly' in request.get_json():
        appt_req.recurring_weekly = request.get_json()['recurring_weekly']
    if 'recurring_enddate' in request.get_json():
        appt_req.recurring_enddate = request.get_json()['recurring_enddate']
    db.session.add(appt_req)
    db.session.commit()
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