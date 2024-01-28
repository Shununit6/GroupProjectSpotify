from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms import IntegerField, StringField, SubmitField

class SongEditForm(FlaskForm):
    artist_name = StringField('Artist Name')
    title = StringField('Song Title')
    lyrics = StringField('Lyrics')
    url = StringField('Song Image URL')
    duration = IntegerField('Song Duration')
    release_date = StringField('Release Date')
    song_file = FileField("Song File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create POST")
