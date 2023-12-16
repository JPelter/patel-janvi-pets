# STL IMPORTS

# EXT IMPORTS
from flask import Flask, jsonify
from waitress import serve

# FLASK INIT
app = Flask(__name__)

#########################
##### SERVER ROUTES #####
#########################
@app.route("/api/health", methods=['GET'])
def hello_world2():
    print("Someone checked the health endpoint!")
    return jsonify({"health":"Still alive!"})

if __name__ == '__main__':
    print("Starting server!")
    serve(app, host='0.0.0.0', port=8080)
