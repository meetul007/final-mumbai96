"""Added image upload

Revision ID: 5d1ae5273001
Revises: 5c1abe1f9c8a
Create Date: 2026-01-19 11:10:50.845761

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5d1ae5273001'
down_revision = '5c1abe1f9c8a'
branch_labels = None
depends_on = None


def upgrade():
    # IMPORTANT: ensure no open transaction
    op.execute("COMMIT")

    # 1️⃣ Create business_images table (fast)
    op.create_table(
        'business_images',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('business_id', sa.Integer(), nullable=False),
        sa.Column('image_path', sa.String(length=255), nullable=False),
        sa.Column('is_primary', sa.Boolean(), server_default=sa.false()),
        sa.Column('sort_order', sa.Integer(), server_default='0'),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()')),

        sa.ForeignKeyConstraint(
            ['business_id'],
            ['businesses.id'],
            ondelete='CASCADE'
        )
    )

    # 2️⃣ Create index CONCURRENTLY (NON-BLOCKING)
    op.execute("COMMIT")
    op.create_index(
        'ix_business_images_business_id',
        'business_images',
        ['business_id'],
        postgresql_concurrently=True
    )

    # 3️⃣ Add category image column (NO batch mode)
    op.add_column(
        'categories',
        sa.Column('image_path', sa.String(length=255))
    )


def downgrade():
    op.drop_index(
        'ix_business_images_business_id',
        table_name='business_images'
    )
    op.drop_table('business_images')
    op.drop_column('categories', 'image_path')
