from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired

class CreateEditAlbumForm(FlaskForm):
    title = StringField('Song Title')
    url = StringField('Song Image URL')
    release_date = StringField('Release Date')
    copyright = StringField('Song Duration')
    submit = SubmitField('Submit')
