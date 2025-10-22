"""
Database Models for Real Estate System using SQLAlchemy
Strictly follows the specified database structure with exact field names and relationships.
"""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    Date,
    Boolean,
    ForeignKey,
    LargeBinary,
)
from sqlalchemy.orm import declarative_base, relationship
from datetime import date

Base = declarative_base()


class Owner(Base):
    """Owner table - stores property owner information"""

    __tablename__ = "Owner"

    IdOwner = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String(255), nullable=False)
    Address = Column(String(500), nullable=False)
    Photo = Column(LargeBinary, nullable=True)
    Birthday = Column(Date, nullable=False)

    # Relationships
    properties = relationship(
        "Property", back_populates="owner", cascade="all, delete-orphan", lazy="select"
    )

    def __repr__(self):
        return f"<Owner(IdOwner={self.IdOwner}, Name='{self.Name}')>"


class Property(Base):
    """Property table - stores real estate property information"""

    __tablename__ = "Property"

    IdProperty = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String(255), nullable=False)
    Address = Column(String(500), nullable=False)
    Price = Column(Numeric(18, 2), nullable=False)
    CodeInternal = Column(String(50), nullable=False, unique=True)
    Year = Column(Integer, nullable=False)
    IdOwner = Column(
        Integer, ForeignKey("Owner.IdOwner", ondelete="CASCADE"), nullable=False
    )

    # Relationships
    owner = relationship("Owner", back_populates="properties", lazy="select")

    property_images = relationship(
        "PropertyImage",
        back_populates="property",
        cascade="all, delete-orphan",
        lazy="select",
    )

    property_traces = relationship(
        "PropertyTrace",
        back_populates="property",
        cascade="all, delete-orphan",
        lazy="select",
    )

    def __repr__(self):
        return f"<Property(IdProperty={self.IdProperty}, Name='{self.Name}', CodeInternal='{self.CodeInternal}')>"


class PropertyImage(Base):
    """PropertyImage table - stores images associated with properties"""

    __tablename__ = "PropertyImage"

    IdPropertyImage = Column(Integer, primary_key=True, autoincrement=True)
    IdProperty = Column(
        Integer, ForeignKey("Property.IdProperty", ondelete="CASCADE"), nullable=False
    )
    File = Column(LargeBinary, nullable=False)
    Enabled = Column(Boolean, nullable=False, default=True)

    # Relationships
    property = relationship("Property", back_populates="property_images", lazy="select")

    def __repr__(self):
        return f"<PropertyImage(IdPropertyImage={self.IdPropertyImage}, IdProperty={self.IdProperty}, Enabled={self.Enabled})>"


class PropertyTrace(Base):
    """PropertyTrace table - stores historical transaction traces for properties"""

    __tablename__ = "PropertyTrace"

    IdPropertyTrace = Column(Integer, primary_key=True, autoincrement=True)
    IdProperty = Column(
        Integer, ForeignKey("Property.IdProperty", ondelete="CASCADE"), nullable=False
    )
    DateSale = Column(Date, nullable=False)
    Name = Column(String(255), nullable=False)
    Value = Column(Numeric(18, 2), nullable=False)
    Tax = Column(Numeric(18, 2), nullable=False)

    # Relationships
    property = relationship("Property", back_populates="property_traces", lazy="select")

    def __repr__(self):
        return f"<PropertyTrace(IdPropertyTrace={self.IdPropertyTrace}, IdProperty={self.IdProperty}, DateSale={self.DateSale})>"
