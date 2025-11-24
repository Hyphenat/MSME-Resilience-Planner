from app.models.schemas import Supplier
from typing import List

# Weighted Risk Scoring Algorithm
WEIGHTS = {
    "financialStability": 0.25,
    "deliveryReliability": 0.25,
    "qualityScore": 0.20,
    "geographicRisk": 0.20,
    "criticality": 0.10
}

def calculate_risk_score(supplier: Supplier) -> float:
    """Calculate risk score (0-10) for a single supplier"""
    rf = supplier.riskFactors or {}
    
    # Invert scores (higher factor = lower risk, so we invert)
    financial = 10 - getattr(rf, 'financialStability', 5)
    delivery = 10 - getattr(rf, 'deliveryReliability', 5)
    quality = 10 - getattr(rf, 'qualityScore', 5)
    geographic = getattr(rf, 'geographicRisk', 5)
    criticality = 10 if supplier.isCritical else 5
    
    score = (
        WEIGHTS["financialStability"] * financial +
        WEIGHTS["deliveryReliability"] * delivery +
        WEIGHTS["qualityScore"] * quality +
        WEIGHTS["geographicRisk"] * geographic +
        WEIGHTS["criticality"] * criticality
    )
    return round(min(max(score, 0), 10), 2)

def calculate_supply_chain_risk(suppliers: List[Supplier]) -> dict:
    """Calculate overall supply chain risk"""
    if not suppliers:
        return {"overallScore": 0, "supplierRisks": []}
    
    risks = [{"id": s.id, "name": s.name, "score": calculate_risk_score(s)} for s in suppliers]
    critical_count = sum(1 for s in suppliers if s.isCritical)
    dependency_factor = min(critical_count / max(len(suppliers), 1) * 2, 3)
    
    avg_risk = sum(r["score"] for r in risks) / len(risks)
    overall = min(avg_risk + dependency_factor, 10)
    
    return {
        "overallScore": round(overall, 2),
        "averageSupplierRisk": round(avg_risk, 2),
        "criticalSupplierCount": critical_count,
        "supplierRisks": risks
    }