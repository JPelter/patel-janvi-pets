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
    app.logger.debug(f"Got request for appointments with JSON:\n{request.get_json()}")
    appt_req = db.session.query(APPOINTMENT_REQUEST).filter(APPOINTMENT_REQUEST.customer_uuid == session['user_uuid'], APPOINTMENT_REQUEST.request_accepted == None).first()
    if appt_req:
        return jsonify({"message":"You already have a pending appointment request!"}), 405 # METHOD NOT
    # MANDATORY FIELDS
    appt_req = APPOINTMENT_REQUEST(customer_uuid=session['user_uuid'], target_time=request.get_json()['target_time'], service_requested=request.get_json()['service_requested'])
    # ADD OPTIONAL FIELDS IF PRESENT!
    appt_req.request_note = request.get_json().get('request_note')
    appt_req.recurring_weekly = request.get_json().get('recurring_weekly')
    appt_req.recurring_enddate = request.get_json().get('recurring_enddate')
    db.session.add(appt_req)
    db.session.commit()
    return jsonify({"message":"Appointment request created!"})

@app.route("/api/request-appointment", methods=['GET'])
@login_required()
def get_request():
    appt_req = db.session.query(APPOINTMENT_REQUEST).filter(APPOINTMENT_REQUEST.customer_uuid == session['user_uuid'], APPOINTMENT_REQUEST.request_accepted == None).first()
    if appt_req:
        return jsonify({
            "request_uuid": appt_req.uuid,
            "customer_uuid": appt_req.customer_uuid,
            "target_time": appt_req.target_time,
            "service_requested": appt_req.service_requested,
            "recurring_weekly": appt_req.recurring_weekly,
            "recurring_enddate": appt_req.recurring_enddate
        })
    else:
        return jsonify({"message": "No appointment requests found."}), 204  # Return HTTP 204 for no content
    
# ADMIN ROUTES
@app.route("/api/admin/request-appointment", methods=['GET'])
@login_required(admin_endpoint=True)
def admin_get_request():
    appt_reqs = db.session.query(APPOINTMENT_REQUEST, ACCOUNT).join(ACCOUNT, APPOINTMENT_REQUEST.customer_uuid == ACCOUNT.uuid).filter(APPOINTMENT_REQUEST.request_accepted == None).all()
    requests = []
    for appt_req, account in appt_reqs:
        request_data = {
            "customer_uuid": appt_req.customer_uuid,
            "target_time": appt_req.target_time,
            "service_requested": appt_req.service_requested,
            "recurring_weekly": appt_req.recurring_weekly,
            "recurring_enddate": appt_req.recurring_enddate,
            "email": account.email
        }
        requests.append(request_data)
    return jsonify(requests)

@app.route("/api/admin/request-appointment", methods=['POST'])
@login_required(admin_endpoint=True)
def admin_resolve_request():
    appt_req_uuid = request.get_json().get('appt_req_uuid')
    request_accepted = request.get_json().get('request_accepted')
    appt_req = db.session.query(APPOINTMENT_REQUEST).filter(APPOINTMENT_REQUEST.uuid == appt_req_uuid).first()
    appt_req.request_accepted = request_accepted

    if request_accepted:
        # Create an APPOINTMENT
        appointment = APPOINTMENT(customer_uuid=appt_req.customer_uuid, appointment_time=appt_req.target_time, service_requested=appt_req.service_requested, admin_uuid=session['user_uuid'], request_uuid=appt_req_uuid)
        appointment.recurring_weekly = appt_req.recurring_weekly
        appointment.recurring_enddate = appt_req.recurring_enddate
        db.session.add(appointment)

    db.session.commit()
    return jsonify({"message": "Appointment request resolved"})

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