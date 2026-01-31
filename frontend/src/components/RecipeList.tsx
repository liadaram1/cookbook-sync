import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../types/Recipe';
import { recipeService } from '../services/api';
import RecipeCard from './RecipeCard';

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await recipeService.getAll();
      setRecipes(data);
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
      console.error('Error loading recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id: string) => {
    navigate(`/recipes/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/recipes/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await recipeService.delete(id);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (err) {
      setError('Failed to delete recipe. Please try again.');
      console.error('Error deleting recipe:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
        <button
          onClick={loadRecipes}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600 mb-4">No recipes found</h3>
        <p className="text-gray-500 mb-6">Start by adding your first recipe!</p>
        <button
          onClick={() => navigate('/recipes/new')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Your First Recipe
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Recipes</h2>
        <button
          onClick={() => navigate('/recipes/new')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Recipe
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}