export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cooking_time: number;
  servings: number;
  created_at: string;
  updated_at: string;
}

export interface RecipeCreate {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cooking_time: number;
  servings: number;
}

export interface RecipeUpdate {
  title?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string;
  cooking_time?: number;
  servings?: number;
}