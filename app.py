import json
from base64 import b64encode, b64decode

from flask import *
from simplecrypt import encrypt, decrypt
from werkzeug.exceptions import HTTPException

from config import *
from secrets import ENCRYPTION_SECRET

app = Flask(__name__)


# GLOBAL TEMPLATING VARIABLES
@app.context_processor
def inject_global_variables():
    return {
        'transition_color': COLOR_TRANSITION
    }


# ERROR PAGES
@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    return render_template('error_page.html', code=code, reason=str(e))


@app.route('/')
def dashboard():
    return render_template('dashboard.html')


@app.route('/configure')
def configure_home():
    return render_template('configure_home.html')


@app.route('/configure/layout')
def configure_layout():
    return render_template('configure_layout.html')


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


if __name__ == '__main__':
    app.run()
