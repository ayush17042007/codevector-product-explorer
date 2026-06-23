from database import SessionLocal
from models import Product
from datetime import datetime, UTC

db = SessionLocal()

product = Product(
    name="TEST NEW PRODUCT",
    category="Electronics",
    price=3500,
    created_at=datetime.now(UTC),
    updated_at=datetime.now(UTC)
)

db.add(product)
db.commit()

print("Inserted")