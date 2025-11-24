from fastapi import APIRouter
from app.algorithms.risk_scoring import calculate_risk_score, calculate_supply_chain_risk
from app.models.schemas import Supplier
from typing import List

router = APIRouter()

@router.post("/supplier")
def get_supplier_risk(supplier: dict):
    s = Supplier(**supplier.get('supplier', supplier))
    score = calculate_risk_score(s)
    return {"supplierId": s.id, "riskScore": score, "riskLevel": get_risk_level(score)}

@router.post("/supply-chain")
def get_supply_chain_risk(data: dict):
    suppliers = [Supplier(**s) for s in data.get('suppliers', [])]
    result = calculate_supply_chain_risk(suppliers)
    return result

def get_risk_level(score: float) -> str:
    if score <= 3: return "low"
    if score <= 6: return "medium"
    if score <= 8: return "high"
    return "critical"
