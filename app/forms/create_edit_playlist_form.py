from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired

class CreateEditPlaylistForm(FlaskForm):
    title = StringField('Playlist Title')
    url = StringField('Playlist Image URL')
    description = StringField('Playlist description')
    submit = SubmitField('Submit')
