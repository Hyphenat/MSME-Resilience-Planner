from typing import List
from app.models.schemas import Supplier
from app.algorithms.risk_scoring import calculate_supply_chain_risk

def compare_strategies(current: List[Supplier], recommended: List[Supplier]) -> dict:
    """Delta impact calculation for strategy comparison"""
    
    current_risk = calculate_supply_chain_risk(current)
    recommended_risk = calculate_supply_chain_risk(recommended)
    
    current_cost = sum(s.costPerUnit or 0 for s in current)
    recommended_cost = sum(s.costPerUnit or 0 for s in recommended)
    
    current_lead = sum(s.leadTimeDays for s in current) / max(len(current), 1)
    recommended_lead = sum(s.leadTimeDays for s in recommended) / max(len(recommended), 1)
    
    return {
        "before": {
            "riskScore": current_risk["overallScore"],
            "totalCost": current_cost,
            "avgLeadTime": round(current_lead, 1)
        },
        "after": {
            "riskScore": recommended_risk["overallScore"],
            "totalCost": recommended_cost,
            "avgLeadTime": round(recommended_lead, 1)
        },
        "delta": {
            "riskReduction": round(current_risk["overallScore"] - recommended_risk["overallScore"], 2),
            "costChange": round(recommended_cost - current_cost, 2),
            "leadTimeChange": round(recommended_lead - current_lead, 1)
        },
        "recommendation": "proceed" if recommended_risk["overallScore"] < current_risk["overallScore"] else "review"
    }
