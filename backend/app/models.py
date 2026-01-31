from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid


class RecipeBase(BaseModel):
    """Base model for Recipe with common fields."""

    title: str = Field(..., min_length=1, max_length=200, description="Recipe title")
    description: str = Field(
        ..., max_length=1000, description="Brief description of the recipe"
    )
    ingredients: List[str] = Field(..., min_items=1, description="List of ingredients")
    instructions: str = Field(..., min_length=1, description="Cooking instructions")
    cooking_time: int = Field(..., gt=0, description="Cooking time in minutes")
    servings: int = Field(..., gt=0, description="Number of servings")


class RecipeCreate(RecipeBase):
    """Model for creating a new recipe."""

    pass


class RecipeUpdate(BaseModel):
    """Model for updating an existing recipe. All fields are optional."""

    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    ingredients: Optional[List[str]] = Field(None, min_items=1)
    instructions: Optional[str] = Field(None, min_length=1)
    cooking_time: Optional[int] = Field(None, gt=0)
    servings: Optional[int] = Field(None, gt=0)


class Recipe(RecipeBase):
    """Complete Recipe model with all fields including id and timestamps."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "title": "Spaghetti Carbonara",
                "description": "Classic Italian pasta dish with eggs, cheese, and pancetta",
                "ingredients": [
                    "400g spaghetti",
                    "200g pancetta",
                    "4 eggs",
                    "100g parmesan cheese",
                    "Black pepper",
                    "Salt",
                ],
                "instructions": "1. Cook pasta according to package directions. 2. Fry pancetta until crispy. 3. Beat eggs with cheese. 4. Combine hot pasta with pancetta, then add egg mixture off heat. 5. Season and serve.",
                "cooking_time": 25,
                "servings": 4,
                "created_at": "2024-01-15T10:30:00Z",
                "updated_at": "2024-01-15T10:30:00Z",
            }
        }
