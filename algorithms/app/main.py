from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import risk_router, simulation_router, recommendation_router

app = FastAPI(title="MSME Resilience Algorithms", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(risk_router.router, prefix="/risk", tags=["Risk"])
app.include_router(simulation_router.router, prefix="/simulation", tags=["Simulation"])
app.include_router(recommendation_router.router, prefix="/recommendation", tags=["Recommendation"])

@app.get("/health")
def health_check():
    return {"status": "healthy"}