import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Recipe } from '../types/Recipe';
import { recipeService } from '../services/api';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadRecipe(id);
    }
  }, [id]);

  const loadRecipe = async (recipeId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await recipeService.getById(recipeId);
      setRecipe(data);
    } catch (err) {
      setError('Failed to load recipe. It may have been deleted.');
      console.error('Error loading recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!recipe || !window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await recipeService.delete(recipe.id);
      navigate('/');
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

  if (error || !recipe) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error || 'Recipe not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Go back to recipes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Recipes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{recipe.description}</p>

          <div className="flex gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>{recipe.cooking_time}</strong> minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span><strong>{recipe.servings}</strong> servings</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{recipe.instructions}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
            <p>Created: {new Date(recipe.created_at).toLocaleDateString()}</p>
            <p>Last updated: {new Date(recipe.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}