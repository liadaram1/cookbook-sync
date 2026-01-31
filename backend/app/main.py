from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.recipes import router as recipes_router

app = FastAPI(
    title="Cookbook API",
    description="A RESTful API for managing recipes in an online cookbook",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],  # Vite and common React dev ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(recipes_router)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Welcome to the Cookbook API",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}
