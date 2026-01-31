export interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cooking_time: number;
  servings: number;
  created_at?: string;
  updated_at?: string;
}