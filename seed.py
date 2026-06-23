from faker import Faker
from datetime import timedelta, datetime
from database import engine, SessionLocal
from models import Base, Product
import random
fake=Faker()
Base.metadata.create_all(bind=engine)
db=SessionLocal()
categories=[
    "Electronics",
    "Books",
    "Fashion",
    "Sports",
    "Home",
    "Toys"
]
PRODUCT_NAMES = {
    "Electronics": [
        "Wireless Headphones",
        "Gaming Mouse",
        "Mechanical Keyboard",
        "Smart Watch",
        "Bluetooth Speaker",
        "Laptop Stand",
        "Webcam",
        "USB Hub",
        "Power Bank",
        "Monitor"
    ],

    "Books": [
        "Python Programming",
        "Data Structures Guide",
        "Machine Learning Basics",
        "System Design Handbook",
        "Algorithms Unlocked",
        "Deep Learning Explained",
        "Clean Code",
        "Database Essentials",
        "Operating Systems",
        "Networking Fundamentals"
    ],

    "Fashion": [
        "Cotton T-Shirt",
        "Denim Jacket",
        "Running Shoes",
        "Casual Hoodie",
        "Formal Shirt",
        "Leather Wallet",
        "Slim Fit Jeans",
        "Sports Cap",
        "Sneakers",
        "Winter Sweater"
    ],

    "Sports": [
        "Football",
        "Cricket Bat",
        "Yoga Mat",
        "Basketball",
        "Tennis Racket",
        "Dumbbell Set",
        "Skipping Rope",
        "Sports Bottle",
        "Training Gloves",
        "Cycling Helmet"
    ],

    "Home": [
        "Coffee Maker",
        "Vacuum Cleaner",
        "Table Lamp",
        "Air Purifier",
        "Wall Clock",
        "Dining Chair",
        "Storage Box",
        "Water Filter",
        "Study Desk",
        "Floor Mat"
    ],

    "Toys": [
        "Building Blocks",
        "Remote Control Car",
        "Puzzle Set",
        "Action Figure",
        "Toy Train",
        "Teddy Bear",
        "Board Game",
        "Doll House",
        "Science Kit",
        "Robot Toy"
    ]
}
BRANDS = [
    "Nova",
    "Apex",
    "Vertex",
    "Prime",
    "Pulse",
    "Nexus",
    "Elite",
    "Core"
]
PRICE_RANGES = {
    "Electronics": (500, 50000),
    "Books": (100, 3000),
    "Fashion": (300, 10000),
    "Sports": (500, 20000),
    "Home": (500, 30000),
    "Toys": (100, 10000)
}
TOTAL_PRODUCTS=200000
BATCH_SIZE=5000
for batch_start in range(0, TOTAL_PRODUCTS, BATCH_SIZE):
    products=[]
    for i in range(BATCH_SIZE):
        created_time=fake.date_time_between(
            start_date="-2y",
            end_date="now"
        )
        updated_time=fake.date_time_between(
            start_date=created_time,
            end_date="now"
        )
        category = random.choice(categories)

        name = (
            f"{random.choice(BRANDS)} "
            f"{random.choice(PRODUCT_NAMES[category])} "
            f"{random.randint(100,999)}"
        )
        min_price, max_price = PRICE_RANGES[category]

        price = round(
            random.uniform(min_price, max_price),
            2
        )
        product=Product(
            name=name,
            category=category,
            price=price,
            created_at=created_time,
            updated_at=updated_time        
        )
        products.append(product)
    db.bulk_save_objects(products)
    db.commit()
    print(f"Inserted {min(batch_start+BATCH_SIZE, TOTAL_PRODUCTS)} products")
db.close()
print("200000 products inserted successfully!")