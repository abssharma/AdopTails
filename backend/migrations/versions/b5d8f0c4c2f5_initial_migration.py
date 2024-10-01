"""Initial migration

Revision ID: b5d8f0c4c2f5
Revises: 
Create Date: 2024-09-30 18:08:09.794932

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5d8f0c4c2f5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.add_column(sa.Column('personality', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('activity', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('treat', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('toy', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.drop_column('toy')
        batch_op.drop_column('treat')
        batch_op.drop_column('activity')
        batch_op.drop_column('personality')

    # ### end Alembic commands ###