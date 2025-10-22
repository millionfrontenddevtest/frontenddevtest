# Real Estate Database Models

Production-ready database model definitions that strictly follow the specified structure.

## Database Structure

### Tables and Relationships

**Owner** (One-to-Many → Property)

- `IdOwner` (Primary Key)
- `Name`
- `Address`
- `Photo`
- `Birthday`

**Property** (Belongs to Owner, One-to-Many → PropertyImage, PropertyTrace)

- `IdProperty` (Primary Key)
- `Name`
- `Address`
- `Price`
- `CodeInternal` (Unique)
- `Year`
- `IdOwner` (Foreign Key → Owner.IdOwner)

**PropertyImage** (Belongs to Property)

- `IdPropertyImage` (Primary Key)
- `IdProperty` (Foreign Key → Property.IdProperty)
- `File`
- `Enabled`

**PropertyTrace** (Belongs to Property)

- `IdPropertyTrace` (Primary Key)
- `IdProperty` (Foreign Key → Property.IdProperty)
- `DateSale`
- `Name`
- `Value`
- `Tax`

## SQLAlchemy (Python)

### Installation

```bash
cd database-models/sqlalchemy
pip install -r requirements.txt
```

### Usage

```python
from models import Owner, Property, PropertyImage, PropertyTrace, Base
from database import engine, Session, init_db

# Initialize database (create tables)
init_db()

# Create session
session = Session()

# Use the models (example)
owner = Owner(
    Name="John Doe",
    Address="123 Main St",
    Birthday=date(1980, 1, 15)
)
session.add(owner)
session.commit()

# Close session
session.close()
```

### Configuration

Update `DATABASE_URL` in `database.py` with your database credentials:

- PostgreSQL: `postgresql://user:password@localhost:5432/realstate_db`
- MySQL: `mysql+pymysql://user:password@localhost:3306/realstate_db`
- SQLite: `sqlite:///./realstate.db`
- SQL Server: `mssql+pyodbc://user:password@localhost/realstate_db?driver=ODBC+Driver+17+for+SQL+Server`

### Features

- **Cascade Deletion**: When an Owner is deleted, all associated Properties are deleted
- When a Property is deleted, all associated PropertyImages and PropertyTraces are deleted
- **Exact Field Names**: All field names match the specification exactly
- **Type Safety**: Proper column types (Integer, String, Numeric, Date, Boolean, Binary)
- **Relationships**: Bidirectional relationships configured with proper lazy loading

## Prisma (TypeScript/JavaScript)

### Installation

```bash
cd database-models/prisma
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update the `DATABASE_URL` in `.env` with your database credentials

### Generate Prisma Client

```bash
npm run prisma:generate
```

### Create Migration

```bash
npm run prisma:migrate
```

### Usage

```typescript
import prisma from "./client";

// Create owner with property
const owner = await prisma.owner.create({
  data: {
    Name: "John Doe",
    Address: "123 Main St",
    Birthday: new Date("1980-01-15"),
    properties: {
      create: {
        Name: "Luxury Apartment",
        Address: "456 Park Ave",
        Price: 500000,
        CodeInternal: "PROP001",
        Year: 2020,
      },
    },
  },
});

// Query with relations
const property = await prisma.property.findUnique({
  where: { IdProperty: 1 },
  include: {
    owner: true,
    property_images: true,
    property_traces: true,
  },
});

// Don't forget to disconnect
await prisma.$disconnect();
```

### Prisma Commands

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and apply migrations
- `npm run prisma:studio` - Open Prisma Studio (GUI)
- `npm run prisma:push` - Push schema to database (without migrations)
- `npm run prisma:pull` - Pull schema from existing database

### Features

- **Cascade Deletion**: `onDelete: Cascade` configured for all foreign keys
- **Exact Field Names**: All field names match the specification exactly
- **Type Safety**: Full TypeScript support with generated types
- **Indexes**: Proper indexing on foreign key columns for performance
- **Unique Constraints**: `CodeInternal` field has unique constraint

## Key Features (Both ORMs)

✅ **Exact field names** preserved as specified  
✅ **Proper relationships** with cascade deletion  
✅ **Foreign key constraints** correctly defined  
✅ **One-to-Many relationships** properly configured  
✅ **No additional or removed fields**  
✅ **Production-ready** with proper types and constraints  
✅ **Database agnostic** (PostgreSQL, MySQL, SQLite, SQL Server)

## Notes

- Photo and File fields use `LargeBinary` (SQLAlchemy) / `Bytes` (Prisma) for binary data
- Price, Value, and Tax use `Decimal(18, 2)` for monetary precision
- DateSale and Birthday use `Date` type (not DateTime)
- CodeInternal has a unique constraint
- All foreign keys have cascade deletion rules
