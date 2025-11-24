from typing import Dict, Optional

SCENARIO_RULES = {
    "supplier_failure": {"severity": 1.0, "cost_factor": 0.3, "severity_label": "high"},
    "pandemic": {"severity": 0.8, "cost_factor": 0.5, "severity_label": "severe"},
    "port_strike": {"severity": 0.6, "cost_factor": 0.2, "severity_label": "moderate"},
    "natural_disaster": {"severity": 0.9, "cost_factor": 0.4, "severity_label": "high"},
    "import_ban": {"severity": 1.0, "cost_factor": 0.6, "severity_label": "critical"},
    "custom": {"severity": 0.5, "cost_factor": 0.2, "severity_label": "variable"}
}

def apply_scenario_rules(scenario_type: str, custom_params: Optional[Dict] = None) -> Dict:
    """Rule-based scenario engine"""
    base = SCENARIO_RULES.get(scenario_type, SCENARIO_RULES["custom"])
    
    if custom_params:
        return {**base, **custom_params}
    return base