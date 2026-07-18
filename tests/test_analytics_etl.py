import pytest
from src.analytics_etl import AnalyticsETL

@pytest.fixture
def etl_system() -> AnalyticsETL:
    engine = AnalyticsETL()
    engine.upsert_customer_scd2("cust-501", "Standard", "2026-01-01T00:00:00")
    engine.upsert_customer_scd2("cust-501", "Premium", "2026-06-01T00:00:00")
    return engine

def test_slowly_changing_dimensions_type2_lineage(etl_system: AnalyticsETL):
    """Verifies historical states are preserved rather than overwritten in place."""
    records = [r for r in etl_system.gold_customer_dim if r.customer_id == "cust-501"]
    assert len(records) == 2
    assert records[0].tier == "Standard"
    assert records[0].is_current is False

def test_point_in_time_correctness_resolution(etl_system: AnalyticsETL):
    """Confirms historical timelines resolve correctly based on query parameters."""
    tier_in_march = etl_system.get_pit_customer_tier("cust-501", "2026-03-15T12:00:00")
    tier_in_july = etl_system.get_pit_customer_tier("cust-501", "2026-07-10T12:00:00")
    
    assert tier_in_march == "Standard"
    assert tier_in_july == "Premium"