from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms import IntegerField, StringField, SubmitField

class SongForm(FlaskForm):
    artist_name = StringField('Artist Name')
    title = StringField('Song Title')
    lyrics = StringField('Lyrics')
    url = StringField('Song Image URL')
    duration = IntegerField('Song Duration')
    release_date = StringField('Release Date')
    song = FileField("Song File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create POST")
