"""Single lookup point for provider adapters, keyed by slug."""

from apps.providers.aws.provider import AWSProvider
from apps.providers.azure.provider import AzureProvider
from apps.providers.base import CloudProvider
from apps.providers.gcp.provider import GCPProvider

PROVIDER_REGISTRY: dict[str, type[CloudProvider]] = {
    "azure": AzureProvider,
    "aws": AWSProvider,
    "gcp": GCPProvider,
}


def get_provider(slug: str) -> CloudProvider:
    provider_cls = PROVIDER_REGISTRY.get(slug)
    if provider_cls is None:
        raise ValueError(f"Unknown provider: {slug}")
    return provider_cls()
