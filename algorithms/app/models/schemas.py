from pydantic import BaseModel
from typing import List, Optional, Dict

class Location(BaseModel):
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    coordinates: Optional[Dict[str, float]] = None

class RiskFactors(BaseModel):
    financialStability: float = 5.0
    deliveryReliability: float = 5.0
    qualityScore: float = 5.0
    geographicRisk: float = 5.0

class Supplier(BaseModel):
    id: str
    name: str
    location: Optional[Location] = None
    riskFactors: Optional[RiskFactors] = None
    leadTimeDays: int = 7
    costPerUnit: Optional[float] = None
    isCritical: bool = False
    materials: List[str] = []

class DisruptionRequest(BaseModel):
    suppliers: List[Supplier]
    affectedIds: List[str]
    scenarioType: str
    parameters: Optional[Dict] = None

class RecommendationRequest(BaseModel):
    affectedSupplierId: str
    allSuppliers: List[Supplier]
    criteria: Optional[Dict] = None

class CompareRequest(BaseModel):
    current: List[Supplier]
    recommended: List[Supplier]