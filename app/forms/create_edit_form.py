from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired

class CreateEditSongForm(FlaskForm):
    artist = StringField('Artist Name', validators=[DataRequired()])
    title = StringField('Song Title', validators=[DataRequired()])
    lyrics = StringField('Lyrics')
    url = StringField('Song Image URL')
    duration = IntegerField('Song Duration')
    release_date = StringField('Release Date')
    submit = SubmitField('Submit')
