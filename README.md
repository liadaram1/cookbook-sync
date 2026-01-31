# Cookbook Sync

A full-stack online cookbook application for managing recipes with CRUD operations.

## Tech Stack

### Backend

- **Python 3.10+** with **FastAPI** framework
- **Pydantic** for data validation
- **Uvicorn** ASGI server
- In-memory data store (ready for database integration)

### Frontend

- **React 19** with **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

## Project Structure

```
cookbook-sync/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI application
│   │   ├── models.py         # Pydantic models
│   │   ├── store.py          # In-memory data store
│   │   └── routes/
│   │       ├── __init__.py
│   │       └── recipes.py    # Recipe CRUD endpoints
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RecipeCard.tsx
│   │   │   ├── RecipeDetail.tsx
│   │   │   ├── RecipeForm.tsx
│   │   │   └── RecipeList.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── Recipe.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):

   ```bash
   python -m venv venv

   # On Windows
   venv\Scripts\activate

   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:

   ```bash
   python -m uvicorn app.main:app --reload --port 8000
   ```

   The API will be available at `http://localhost:8000`
   - API Documentation (Swagger UI): `http://localhost:8000/docs`
   - Alternative docs (ReDoc): `http://localhost:8000/redoc`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | `/api/recipes`      | Get all recipes       |
| GET    | `/api/recipes/{id}` | Get a specific recipe |
| POST   | `/api/recipes`      | Create a new recipe   |
| PUT    | `/api/recipes/{id}` | Update a recipe       |
| DELETE | `/api/recipes/{id}` | Delete a recipe       |
| GET    | `/health`           | Health check endpoint |

## Recipe Model

```typescript
interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cooking_time: number; // in minutes
  servings: number;
  created_at: string;
  updated_at: string;
}
```

## Features

- ✅ View all recipes in a responsive grid layout
- ✅ View detailed recipe information
- ✅ Create new recipes with form validation
- ✅ Edit existing recipes
- ✅ Delete recipes with confirmation
- ✅ Sample recipes preloaded for demonstration
- ✅ Responsive design with Tailwind CSS

## Future Enhancements

- [ ] User authentication
- [ ] Persistent database (PostgreSQL/MongoDB)
- [ ] Recipe categories and tags
- [ ] Search and filtering
- [ ] Image upload for recipes
- [ ] Recipe sharing
- [ ] Favorite recipes

## License

MIT License
