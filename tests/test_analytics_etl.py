import pytest
import datetime
from decimal import Decimal
from src.analytics_etl import AnalyticsETL

@pytest.fixture
def production_etl() -> AnalyticsETL:
    pipeline = AnalyticsETL()
    
    # Establish strict bitemporal history boundaries using timezone-aware datetimes
    t1 = datetime.datetime(2026, 1, 1, 0, 0, 0, tzinfo=datetime.timezone.utc)
    t2 = datetime.datetime(2026, 6, 1, 0, 0, 0, tzinfo=datetime.timezone.utc)
    
    # Seed records enforcing explicit Decimal metrics
    pipeline.upsert_customer_scd2("cust-501", "Standard", Decimal("1500.50"), t1)
    pipeline.upsert_customer_scd2("cust-501", "Premium", Decimal("4500.75"), t2)
    return pipeline

def test_numerical_accuracy_and_decimal_types(production_etl: AnalyticsETL):
    """Validates that financial values utilize absolute exact Decimal precision."""
    active_profile = next(r for r in production_etl.gold_db_session if r.is_current)
    assert isinstance(active_profile.lifetime_value, Decimal)
    assert active_profile.lifetime_value == Decimal("4500.75")

def test_point_in_time_snapshot_correctness(production_etl: AnalyticsETL):
    """Enforces correctness-first engineering constraints across historical snapshot gaps."""
    check_date_march = datetime.datetime(2026, 3, 15, 12, 0, 0, tzinfo=datetime.timezone.utc)
    check_date_july = datetime.datetime(2026, 7, 10, 12, 0, 0, tzinfo=datetime.timezone.utc)
    
    assert production_etl.get_pit_customer_tier("cust-501", check_date_march) == "Standard"
    assert production_etl.get_pit_customer_tier("cust-501", check_date_july) == "Premium"
