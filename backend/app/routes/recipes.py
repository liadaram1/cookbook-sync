from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models import Recipe
from app.store import recipe_store

router = APIRouter(prefix="/api/recipes", tags=["recipes"])


@router.get("", response_model=List[Recipe])
async def get_all_recipes():
    """Get all recipes."""
    return recipe_store.get_all()


@router.get("/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: str):
    """Get a specific recipe by ID."""
    recipe = recipe_store.get_by_id(recipe_id)
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Recipe with ID '{recipe_id}' not found",
        )
    return recipe


@router.post("", response_model=Recipe, status_code=status.HTTP_201_CREATED)
async def create_recipe(recipe_data: Recipe):
    """Create a new recipe."""
    return recipe_store.create(recipe_data)


@router.put("/{recipe_id}", response_model=Recipe)
async def update_recipe(recipe_id: str, recipe_data: Recipe):
    """Update an existing recipe."""
    updated_recipe = recipe_store.update(recipe_id, recipe_data)
    if not updated_recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Recipe with ID '{recipe_id}' not found",
        )
    return updated_recipe


@router.delete("/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_recipe(recipe_id: str):
    """Delete a recipe by ID."""
    deleted = recipe_store.delete(recipe_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Recipe with ID '{recipe_id}' not found",
        )
    return None
