# CodeVector Product Explorer

## About

This project was developed as part of the CodeVector Full Stack Internship take-home assignment.

The goal of the assignment was to build a backend capable of handling approximately 200,000 products while supporting:

- Fast pagination
- Category filtering
- Consistent results while data changes
- Efficient data generation and querying

## Tech Stack

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- Faker

### Frontend (Bonus)

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## Key Features

### Fast Cursor-Based Pagination

Instead of using OFFSET-based pagination, the application uses cursor-based pagination with:

- updated_at
- id

This approach scales significantly better for large datasets.

### Consistent Browsing Experience

To prevent duplicates or missed products while data changes, a snapshot-based pagination strategy is used.

Each browsing session receives a snapshot timestamp and all subsequent requests operate on the same snapshot.

### Category Filtering

Products can be filtered by category before pagination is applied.

### Large Dataset Support

The included seed script generates 200,000 products efficiently using batch inserts.

## Database Design

Each product contains:

- id
- name
- category
- price
- created_at
- updated_at

Indexes are used to optimize filtering and pagination queries.

## Running the Project

### Backend

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

### Generate Data

Run:

```bash
python seed.py
```

This generates approximately 200,000 products.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

## AI Usage

AI tools were used during development for implementation assistance, debugging, learning unfamiliar concepts, and frontend generation.

The assignment explicitly focuses on backend engineering rather than UI implementation.

The frontend was created primarily using AI-assisted development tools as a bonus demonstration layer for interacting with the backend API.

The backend architecture, pagination strategy, consistency approach, database design decisions, testing, and understanding of the implementation remain the primary focus of this submission.

## Future Improvements

With more time, potential improvements include:

- PostgreSQL deployment
- Redis caching
- Infinite scrolling
- Search functionality
- Dockerization
- Automated tests
- Performance benchmarking

## Author

Submitted for the CodeVector Full Stack Internship Assignment.
