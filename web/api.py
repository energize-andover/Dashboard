import json
from base64 import b64encode, b64decode

from flask import abort, request, redirect
from simplecrypt import encrypt, decrypt

from secrets import ENCRYPTION_SECRET


def route_apis(app):
    @app.route('/api/encrypt', methods=['GET', 'POST'])
    def encrypt_layout():
        if request.method == "POST":
            try:
                data = json.loads(request.data)
                cipher = encrypt(ENCRYPTION_SECRET, json.dumps(data['data']))
                encoded_cipher = b64encode(cipher).decode('utf-8')
                return {
                    'status': 'ok',
                    'code': 200,
                    'payload': encoded_cipher
                }
            except (KeyError, ValueError, Exception) as e:
                abort(400)
        else:
            return redirect("/")

    @app.route('/api/decrypt', methods=['GET', 'POST'])
    def decrypt_layout():
        if request.method == "POST":
            try:
                data = json.loads(request.data)

                cipher = b64decode(json.dumps(data['data']))
                plaintext = decrypt(ENCRYPTION_SECRET, cipher).decode('utf-8')
                return {
                    'status': 'ok',
                    'code': 200,
                    'payload': plaintext
                }
            except (KeyError, ValueError, Exception) as e:
                abort(400)
        else:
            return redirect("/")
