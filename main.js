from flask import Flask, request, jsonify
import requests
import time

app = Flask(__name__)

KEYV2 = 'jovaapikey14d'
URLV2 = 'http://45.90.13.151:6122/api/bypass'

@app.route('/bypassnew', methods=['GET'])
def bypassnew():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL parameter is required"}), 400

    response = requests.get(URLV2, params={'link': url, 'api_key': KEYV2})

    if response.status_code != 200:
        return jsonify({"error": "Failed to bypass URL"}), response.status_code

    data = response.json()

    if 'key' not in data:
        return jsonify({"error": "Something Went Wrong Try Again Later"}), 500

    final_response = {
        "result": data['key'],
        "credit": "this api is develop by famzz & mad6453",
        "time_taken": data["duration"]
    }

    return jsonify(final_response)

if __name__ == '__main__':
    app.run()
