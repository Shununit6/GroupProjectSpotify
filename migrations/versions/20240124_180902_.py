"""empty message

Revision ID: 86b8f39969c2
Revises: b178d0641c73
Create Date: 2024-01-24 18:09:02.945585

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '86b8f39969c2'
down_revision = 'b178d0641c73'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('songs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('song_file', sa.String(length=2000), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('songs', schema=None) as batch_op:
        batch_op.drop_column('song_file')

    # ### end Alembic commands ###