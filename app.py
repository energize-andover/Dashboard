from flask import Flask, render_template
from werkzeug.exceptions import HTTPException

from config import *

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


if __name__ == '__main__':
    app.run()
