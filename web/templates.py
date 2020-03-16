from flask import render_template


def route_templates(app):
    @app.route('/')
    def dashboard():
        return render_template('dashboard.html')

    @app.route('/configure')
    def configure_home():
        return render_template('configure_home.html')

    @app.route('/configure/layout')
    def configure_layout():
        return render_template('configure_layout.html')

    @app.route('/configure/widgets')
    def configure_widgets():
        return render_template('configure_widgets.html')
