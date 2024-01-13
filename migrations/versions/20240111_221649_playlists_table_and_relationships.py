"""Playlists Table and relationships

Revision ID: 9430b789de78
Revises: 3acc7ead6791
Create Date: 2024-01-11 22:16:49.945869

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9430b789de78'
down_revision = '3acc7ead6791'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('url', sa.String(), nullable=True),
    sa.Column('description', sa.String(length=100), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('playlists')
    # ### end Alembic commands ###