"""
Provider-agnostic interface. Every cloud (Azure, AWS, GCP) implements this
same contract so the rest of the platform (scan engine, scoring, dashboard)
never branches on which cloud it's talking to.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import Enum


class ProviderStatus(str, Enum):
    AVAILABLE = "available"
    COMING_SOON = "coming_soon"


@dataclass
class ConnectionResult:
    success: bool
    account_identifier: str | None = None
    error: str | None = None


@dataclass
class InventoryItem:
    resource_type: str
    resource_id: str
    name: str
    region: str
    metadata: dict = field(default_factory=dict)


@dataclass
class Finding:
    check_id: str
    severity: str  # "low" | "medium" | "high" | "critical"
    resource_id: str
    description: str
    why_it_matters: str
    recommended_fix: str


@dataclass
class CostRecommendation:
    check_id: str
    resource_id: str
    description: str
    estimated_monthly_savings: float


class CloudProvider(ABC):
    """Base contract every cloud provider adapter must implement."""

    slug: str
    status: ProviderStatus = ProviderStatus.COMING_SOON

    @abstractmethod
    def connect(self, credentials: dict) -> ConnectionResult:
        """Validate credentials and establish a connection to the cloud account."""

    @abstractmethod
    def list_inventory(self) -> list[InventoryItem]:
        """Return a normalized inventory of resources for this account."""

    @abstractmethod
    def run_security_checks(self) -> list[Finding]:
        """Run this provider's security checks and return findings."""

    @abstractmethod
    def run_cost_checks(self) -> list[CostRecommendation]:
        """Run this provider's cost-optimization checks."""


class NotImplementedProvider(CloudProvider):
    """
    Placeholder for providers that are visible in the UI but not yet built
    (AWS, GCP for CloudPulse MVP). Registered so the schema/UI treat all
    providers uniformly; every method raises until the real adapter lands.
    """

    status = ProviderStatus.COMING_SOON

    def connect(self, credentials: dict) -> ConnectionResult:
        return ConnectionResult(success=False, error=f"{self.slug} support is coming soon")

    def list_inventory(self) -> list[InventoryItem]:
        raise NotImplementedError(f"{self.slug} provider is not yet implemented")

    def run_security_checks(self) -> list[Finding]:
        raise NotImplementedError(f"{self.slug} provider is not yet implemented")

    def run_cost_checks(self) -> list[CostRecommendation]:
        raise NotImplementedError(f"{self.slug} provider is not yet implemented")
