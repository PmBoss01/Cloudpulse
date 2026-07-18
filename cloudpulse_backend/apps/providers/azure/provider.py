"""
Azure provider adapter — the first fully implemented CloudProvider.
Real connection/inventory/security/cost logic lands here in later phases.
"""

from apps.providers.base import (
    CloudProvider,
    ConnectionResult,
    CostRecommendation,
    Finding,
    InventoryItem,
    ProviderStatus,
)


class AzureProvider(CloudProvider):
    slug = "azure"
    status = ProviderStatus.AVAILABLE

    def connect(self, credentials: dict) -> ConnectionResult:
        raise NotImplementedError

    def list_inventory(self) -> list[InventoryItem]:
        raise NotImplementedError

    def run_security_checks(self) -> list[Finding]:
        raise NotImplementedError

    def run_cost_checks(self) -> list[CostRecommendation]:
        raise NotImplementedError
