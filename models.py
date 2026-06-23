from sqlalchemy import Index, Integer, String, DateTime, Column
from database import Base
class Product(Base):
    __tablename__="products"
    id=Column(Integer, primary_key=True)
    name=Column(String, nullable=False)
    category=Column(String, nullable=False)
    price=Column(Integer, nullable=False)
    created_at=Column(DateTime, nullable=False)
    updated_at=Column(DateTime, nullable=False)
    __table_args__=(
        Index("idx_updated_id","updated_at","id"),
        Index("idx_category", "category"),
    )