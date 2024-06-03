from flask import Flask, request, jsonify
from flask_cors import CORS
import pyrebase
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask application
app = Flask(__name__)
CORS(app)

# Firebase configuration from environment variables
config = {
    'apiKey': os.getenv('API_KEY'),
    'authDomain': os.getenv('AUTH_DOMAIN'),
    'projectId': os.getenv('PROJECT_ID'),
    'storageBucket': os.getenv('STORAGE_BUCKET'),
    'messagingSenderId': os.getenv('MESSAGING_SENDER_ID'),
    'appId': os.getenv('APP_ID'),
    'measurementId': os.getenv('MEASUREMENT_ID'),
    'databaseURL': os.getenv('DATABASE_URL')
}

# Initialize Pyrebase with the config
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()


@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    try:
        user = auth.sign_in_with_email_and_password(username, password)
        return jsonify({'status': 'success', 'user': user}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 401

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000)) 
    app.run(debug=True, port=port)





