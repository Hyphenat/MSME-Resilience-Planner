from fastapi import APIRouter
from app.algorithms.graph_traversal import simulate_disruption
from app.algorithms.scenario_engine import apply_scenario_rules
from app.models.schemas import DisruptionRequest

router = APIRouter()

@router.post("/disrupt")
def run_disruption(request: DisruptionRequest):
    # Apply scenario-specific rules
    params = apply_scenario_rules(request.scenarioType, request.parameters)
    
    # Run graph traversal simulation
    result = simulate_disruption(
        suppliers=request.suppliers,
        affected_ids=request.affectedIds,
        params=params
    )
    return result