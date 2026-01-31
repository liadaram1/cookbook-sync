from typing import Dict, List, Optional
from datetime import datetime
from app.models import Recipe, RecipeCreate, RecipeUpdate
import uuid


class RecipeStore:
    """In-memory storage for recipes."""

    def __init__(self):
        self._recipes: Dict[str, Recipe] = {}
        self._initialize_sample_data()

    def _initialize_sample_data(self):
        """Add some sample recipes for testing."""
        sample_recipes = [
            RecipeCreate(
                title="Classic Margherita Pizza",
                description="A simple and delicious Italian pizza with fresh tomatoes, mozzarella, and basil",
                ingredients=[
                    "500g pizza dough",
                    "200g tomato sauce",
                    "250g fresh mozzarella",
                    "Fresh basil leaves",
                    "2 tbsp olive oil",
                    "Salt to taste",
                ],
                instructions="1. Preheat oven to 250°C (480°F). 2. Roll out the dough on a floured surface. 3. Spread tomato sauce evenly. 4. Add torn mozzarella pieces. 5. Bake for 10-12 minutes until crust is golden. 6. Top with fresh basil and drizzle with olive oil.",
                cooking_time=20,
                servings=4,
            ),
            RecipeCreate(
                title="Chicken Stir Fry",
                description="Quick and healthy Asian-inspired chicken stir fry with vegetables",
                ingredients=[
                    "500g chicken breast, sliced",
                    "2 cups mixed vegetables (bell peppers, broccoli, carrots)",
                    "3 tbsp soy sauce",
                    "1 tbsp sesame oil",
                    "2 cloves garlic, minced",
                    "1 tbsp ginger, grated",
                    "2 tbsp vegetable oil",
                ],
                instructions="1. Heat vegetable oil in a wok over high heat. 2. Add chicken and cook until golden. 3. Add garlic and ginger, stir for 30 seconds. 4. Add vegetables and stir fry for 3-4 minutes. 5. Add soy sauce and sesame oil. 6. Serve hot over rice.",
                cooking_time=15,
                servings=4,
            ),
            RecipeCreate(
                title="Chocolate Chip Cookies",
                description="Soft and chewy homemade chocolate chip cookies",
                ingredients=[
                    "2 1/4 cups all-purpose flour",
                    "1 cup butter, softened",
                    "3/4 cup sugar",
                    "3/4 cup brown sugar",
                    "2 eggs",
                    "1 tsp vanilla extract",
                    "1 tsp baking soda",
                    "1/2 tsp salt",
                    "2 cups chocolate chips",
                ],
                instructions="1. Preheat oven to 375°F (190°C). 2. Mix flour, baking soda, and salt. 3. Beat butter and sugars until creamy. 4. Add eggs and vanilla to butter mixture. 5. Gradually blend in flour mixture. 6. Stir in chocolate chips. 7. Drop rounded tablespoons onto baking sheets. 8. Bake 9-11 minutes until golden brown.",
                cooking_time=25,
                servings=24,
            ),
        ]

        for recipe_data in sample_recipes:
            self.create(recipe_data)

    def get_all(self) -> List[Recipe]:
        """Get all recipes."""
        return list(self._recipes.values())

    def get_by_id(self, recipe_id: str) -> Optional[Recipe]:
        """Get a recipe by ID."""
        return self._recipes.get(recipe_id)

    def create(self, recipe_data: RecipeCreate) -> Recipe:
        """Create a new recipe."""
        recipe = Recipe(
            id=str(uuid.uuid4()),
            title=recipe_data.title,
            description=recipe_data.description,
            ingredients=recipe_data.ingredients,
            instructions=recipe_data.instructions,
            cooking_time=recipe_data.cooking_time,
            servings=recipe_data.servings,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        self._recipes[recipe.id] = recipe
        return recipe

    def update(self, recipe_id: str, recipe_data: RecipeUpdate) -> Optional[Recipe]:
        """Update an existing recipe."""
        existing_recipe = self._recipes.get(recipe_id)
        if not existing_recipe:
            return None

        update_data = recipe_data.model_dump(exclude_unset=True)
        updated_recipe = Recipe(
            id=existing_recipe.id,
            title=update_data.get("title", existing_recipe.title),
            description=update_data.get("description", existing_recipe.description),
            ingredients=update_data.get("ingredients", existing_recipe.ingredients),
            instructions=update_data.get("instructions", existing_recipe.instructions),
            cooking_time=update_data.get("cooking_time", existing_recipe.cooking_time),
            servings=update_data.get("servings", existing_recipe.servings),
            created_at=existing_recipe.created_at,
            updated_at=datetime.utcnow(),
        )
        self._recipes[recipe_id] = updated_recipe
        return updated_recipe

    def delete(self, recipe_id: str) -> bool:
        """Delete a recipe by ID."""
        if recipe_id in self._recipes:
            del self._recipes[recipe_id]
            return True
        return False


# Singleton instance
recipe_store = RecipeStore()
