from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired


class CreateEditSongForm(FlaskForm):
    artist_name = StringField('Artist Name')
    title = StringField('Song Title')
    lyrics = StringField('Lyrics')
    url = StringField('Song Image URL')
    duration = IntegerField('Song Duration')
    release_date = StringField('Release Date')
    submit = SubmitField('Submit')
