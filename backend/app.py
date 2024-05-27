import pymysql.cursors
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='newone',
                             database='curable',
                             cursorclass=pymysql.cursors.DictCursor)

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']  
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
        result = cursor.fetchone()
    if result:
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error'}), 401

if __name__ == '__main__':
    app.run(debug=True, port=6969)
