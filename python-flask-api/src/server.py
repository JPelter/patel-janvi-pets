# STL IMPORTS

# EXT IMPORTS
from flask import Flask
from waitress import serve

# FLASK INIT
app = Flask(__name__)

#########################
##### SERVER ROUTES #####
#########################
@app.route("/", methods=['GET'])
def hello_world():
    print("Someone visited!")
    return "<p>Hello world and all who inhabit it!</p>"

@app.route("/api", methods=['GET'])
def hello_world2():
    print("Someone viffffffasdsited!")
    return "<p>Hello world and all fffwho inhabit it!</p>"

@app.route("/api/test", methods=['GET'])
def hello_world3():
    print("S123123123omeone visited!")
    return "<p>Hello world and all fffwho inhabitzz it!</p>"

if __name__ == '__main__':
    print("Starting server!")
    serve(app, host='0.0.0.0', port=8080)
