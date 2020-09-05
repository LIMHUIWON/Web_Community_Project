"""empty message

Revision ID: 6f8c69cb623b
Revises: 41e7a2fb8f47
Create Date: 2020-09-05 15:21:45.936173

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6f8c69cb623b'
down_revision = '41e7a2fb8f47'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('board', sa.Column('userid', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'board', 'ruser', ['userid'], ['id'], ondelete='CASCADE')
    op.add_column('comment', sa.Column('userid', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'comment', 'ruser', ['userid'], ['id'], ondelete='CASCADE')
    op.add_column('post', sa.Column('userid', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'post', 'ruser', ['userid'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'post', type_='foreignkey')
    op.drop_column('post', 'userid')
    op.drop_constraint(None, 'comment', type_='foreignkey')
    op.drop_column('comment', 'userid')
    op.drop_constraint(None, 'board', type_='foreignkey')
    op.drop_column('board', 'userid')
    # ### end Alembic commands ###
