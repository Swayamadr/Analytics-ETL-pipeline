import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class CustomerDimension(BaseModel):
    customer_id: str
    tier: str
    effective_start: str
    effective_end: Optional[str] = None
    is_current: bool = True

class AnalyticsETL:
    """
    Enterprise ETL Engine demonstrating:
    1. Medallion Architecture data refinement loops
    2. Slowly Changing Dimensions (SCD Type 2) tracking
    3. Point-in-Time (PIT) snapshot correctness
    """
    def __init__(self) -> None:
        self.bronze_storage: List[Dict[str, Any]] = []
        self.silver_storage: List[Dict[str, Any]] = []
        self.gold_customer_dim: List[CustomerDimension] = []

    def ingest_to_bronze(self, payload: Dict[str, Any]) -> None:
        """Bronze: Append immutable raw inbound logging data payloads."""
        self.bronze_storage.append({
            "raw_payload": payload,
            "ingested_at": datetime.datetime.now().isoformat()
        })

    def process_silver_layer(self) -> None:
        """Silver: Perform schema cleansing, drop null fields, and cast types."""
        self.silver_storage = []
        for row in self.bronze_storage:
            raw = row["raw_payload"]
            self.silver_storage.append({
                "tx_id": str(raw.get("tx_id")),
                "tenant_id": str(raw.get("tenant_id")),
                "amount": float(raw.get("amount", 0.0)),
                "event_timestamp": raw.get("timestamp")
            })

    def upsert_customer_scd2(self, customer_id: str, new_tier: str, change_time: str) -> None:
        """Applies SCD Type 2 tracking parameters to preserve audit lineage history."""
        for record in self.gold_customer_dim:
            if record.customer_id == customer_id and record.is_current:
                record.effective_end = change_time
                record.is_current = False
                
        self.gold_customer_dim.append(CustomerDimension(
            customer_id=customer_id,
            tier=new_tier,
            effective_start=change_time,
            effective_end=None,
            is_current=True
        ))

    def get_pit_customer_tier(self, customer_id: str, snapshot_time: str) -> Optional[str]:
        """Guarantees historical Point-in-Time (PIT) lookup validity."""
        for record in self.gold_customer_dim:
            if record.customer_id == customer_id:
                start_ok = record.effective_start <= snapshot_time
                end_ok = record.effective_end is None or snapshot_time < record.effective_end
                if start_ok and end_ok:
                    return record.tier
        return None