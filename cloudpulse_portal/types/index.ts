export type CloudProviderSlug = "azure" | "aws" | "gcp";

export interface CloudAccount {
  id: string;
  provider: CloudProviderSlug;
  displayName: string;
  connected: boolean;
}
