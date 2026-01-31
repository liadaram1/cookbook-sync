from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid


class Recipe(BaseModel):
    """Recipe model with all fields."""

    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()), description="Unique recipe ID"
    )
    title: str = Field(..., min_length=1, max_length=200, description="Recipe title")
    description: str = Field(
        ..., max_length=1000, description="Brief description of the recipe"
    )
    ingredients: List[str] = Field(..., min_items=1, description="List of ingredients")
    instructions: str = Field(..., min_length=1, description="Cooking instructions")
    cooking_time: int = Field(..., gt=0, description="Cooking time in minutes")
    servings: int = Field(..., gt=0, description="Number of servings")
    created_at: datetime = Field(
        default_factory=datetime.utcnow, description="Creation timestamp"
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow, description="Last update timestamp"
    )

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
