from flask import render_template
from werkzeug.exceptions import HTTPException

from config import *
from web.api import route_apis
from web.templates import route_templates


def build_app(app):
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

    route_templates(app)
    route_apis(app)

    return app
