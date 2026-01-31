import type { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function RecipeCard({ recipe, onView, onEdit, onDelete }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{recipe.cooking_time} min</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onView(recipe.id)}
            className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onEdit(recipe.id)}
            className="flex-1 px-3 py-2 bg-amber-500 text-white text-sm rounded-md hover:bg-amber-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}