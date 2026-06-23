from fastapi import FastAPI, Query
from database import SessionLocal
from models import Product
from sqlalchemy import desc, and_, or_
from datetime import datetime, UTC
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://codevector-product-explorer.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return{"message": "CodeVector Assignment API"}
@app.get("/products")
def get_products(
    cursor_updated_at: str | None=None,
    cursor_id: int | None=None,
    snapshot_time: str | None=None,
    category: str | None=None,
    limit: int=20
):
    db=SessionLocal()
    query=db.query(Product)
    if snapshot_time is None:
        snapshot_time=datetime.now(UTC).isoformat()
    snapshot_dt=datetime.fromisoformat(snapshot_time)
    query=query.filter(Product.updated_at<=snapshot_dt)
    if category:
        query=query.filter(Product.category==category)
    if cursor_updated_at and cursor_id:
        cursor_time=datetime.fromisoformat(
            cursor_updated_at
        )
        query=query.filter(
            or_(
                Product.updated_at < cursor_time,
                and_(
                    Product.updated_at==cursor_time,
                    Product.id<cursor_id
                )
            )
        )
    products = (
        query
        .order_by(desc(Product.updated_at), desc(Product.id))
        .limit(limit)
        .all()
    )
    next_cursor=None
    if products:
        last_product=products[-1]
        next_cursor={
            "updated_at":
                last_product.updated_at.isoformat(),
            "id":
                last_product.id
        }
    db.close()
    return{
        "products":products,
        "next_cursor":next_cursor,
        "snapshot_time":snapshot_time
    }