import axios from 'axios';
import type { Recipe } from '../types/Recipe';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const recipeService = {
  // Get all recipes
  getAll: async (): Promise<Recipe[]> => {
    const response = await api.get<Recipe[]>('/recipes');
    return response.data;
  },

  // Get a single recipe by ID
  getById: async (id: string): Promise<Recipe> => {
    const response = await api.get<Recipe>(`/recipes/${id}`);
    return response.data;
  },

  // Create a new recipe
  create: async (recipe: Recipe): Promise<Recipe> => {
    const response = await api.post<Recipe>('/recipes', recipe);
    return response.data;
  },

  // Update an existing recipe
  update: async (id: string, recipe: Recipe): Promise<Recipe> => {
    const response = await api.put<Recipe>(`/recipes/${id}`, recipe);
    return response.data;
  },

  // Delete a recipe
  delete: async (id: string): Promise<void> => {
    await api.delete(`/recipes/${id}`);
  },
};

export default api;