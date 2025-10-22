"""
Database configuration and session management for SQLAlchemy models
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models import Base

# Database URL - Update with your actual database credentials
DATABASE_URL = "postgresql://user:password@localhost:5432/realstate_db"
# For SQLite: DATABASE_URL = "sqlite:///./realstate.db"
# For MySQL: DATABASE_URL = "mysql+pymysql://user:password@localhost:3306/realstate_db"
# For SQL Server: DATABASE_URL = "mssql+pyodbc://user:password@localhost/realstate_db?driver=ODBC+Driver+17+for+SQL+Server"

# Create engine
engine = create_engine(
    DATABASE_URL,
    echo=True,  # Set to False in production
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Thread-safe session
Session = scoped_session(SessionLocal)


def init_db():
    """Initialize database - create all tables"""
    Base.metadata.create_all(bind=engine)


def get_db():
    """Dependency for getting database session"""
    db = Session()
    try:
        yield db
    finally:
        db.close()


def drop_db():
    """Drop all tables - use with caution!"""
    Base.metadata.drop_all(bind=engine)
