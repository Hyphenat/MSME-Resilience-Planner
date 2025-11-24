import networkx as nx
from typing import List, Dict
from app.models.schemas import Supplier

def simulate_disruption(suppliers: List[Supplier], affected_ids: List[str], params: Dict) -> Dict:
    """BFS/DFS graph traversal to simulate disruption impact"""
    
    # Build supply chain graph
    G = nx.DiGraph()
    
    # Add nodes
    G.add_node("manufacturer", type="manufacturer")
    for s in suppliers:
        G.add_node(s.id, type="supplier", data=s.dict())
        G.add_edge(s.id, "manufacturer", weight=s.leadTimeDays)
    
    # Find impacted paths using BFS
    impacted = set()
    total_delay = 0
    cost_increase = 0
    
    for aid in affected_ids:
        if aid in G:
            # BFS from affected node
            impacted.add(aid)
            affected_supplier = next((s for s in suppliers if s.id == aid), None)
            if affected_supplier:
                total_delay += affected_supplier.leadTimeDays * params.get("severity", 1)
                cost_increase += (affected_supplier.costPerUnit or 100) * params.get("cost_factor", 0.2)
    
    # Calculate cascading effects
    severity = params.get("severity", 1)
    
    return {
        "impactedSuppliers": list(impacted),
        "impactedCount": len(impacted),
        "estimatedDelayDays": round(total_delay * severity),
        "estimatedCostIncrease": round(cost_increase * severity, 2),
        "productionImpact": f"{min(len(impacted) / max(len(suppliers), 1) * 100, 100):.1f}%",
        "severity": params.get("severity_label", "moderate")
    }