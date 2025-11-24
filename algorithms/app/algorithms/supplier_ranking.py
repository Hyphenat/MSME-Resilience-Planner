from typing import List, Dict, Optional
from app.models.schemas import Supplier
from app.algorithms.risk_scoring import calculate_risk_score

def rank_alternatives(affected_id: str, suppliers: List[Supplier], criteria: Optional[Dict] = None) -> List[Dict]:
    """Multi-criteria ranking algorithm for alternative suppliers"""
    
    criteria = criteria or {"cost": 0.3, "risk": 0.3, "leadTime": 0.2, "quality": 0.2}
    affected = next((s for s in suppliers if s.id == affected_id), None)
    if not affected:
        return []
    
    # Get materials from affected supplier
    target_materials = set(affected.materials) if affected.materials else set()
    
    # Filter and score alternatives
    alternatives = []
    for s in suppliers:
        if s.id == affected_id:
            continue
        
        # Material compatibility
        supplier_materials = set(s.materials) if s.materials else set()
        if target_materials and not target_materials.intersection(supplier_materials):
            continue
        
        # Calculate scores (normalized 0-1, lower is better)
        risk_score = calculate_risk_score(s) / 10
        cost_score = (s.costPerUnit or 100) / 1000
        lead_score = s.leadTimeDays / 30
        quality = 1 - (getattr(s.riskFactors, 'qualityScore', 5) / 10 if s.riskFactors else 0.5)
        
        # Weighted total
        total = (
            criteria["cost"] * cost_score +
            criteria["risk"] * risk_score +
            criteria["leadTime"] * lead_score +
            criteria["quality"] * quality
        )
        
        alternatives.append({
            "supplierId": s.id,
            "name": s.name,
            "score": round(1 - total, 3),  # Invert so higher = better
            "riskScore": round(risk_score * 10, 2),
            "costPerUnit": s.costPerUnit,
            "leadTimeDays": s.leadTimeDays,
            "location": s.location.dict() if s.location else None
        })
    
    return sorted(alternatives, key=lambda x: x["score"], reverse=True)[:5]