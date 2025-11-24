from fastapi import APIRouter
from app.algorithms.supplier_ranking import rank_alternatives
from app.algorithms.delta_comparison import compare_strategies
from app.models.schemas import RecommendationRequest, CompareRequest

router = APIRouter()

@router.post("/alternatives")
def get_alternatives(request: RecommendationRequest):
    ranked = rank_alternatives(
        affected_id=request.affectedSupplierId,
        suppliers=request.allSuppliers,
        criteria=request.criteria
    )
    return {"recommendations": ranked}

@router.post("/compare")
def compare(request: CompareRequest):
    result = compare_strategies(request.current, request.recommended)
    return result
