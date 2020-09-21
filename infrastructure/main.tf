terraform {
  required_version = ">=0.12.20"
  backend "azurerm" {
    resource_group_name  = "rg-pagopa-psp-report-transaction-terraform"
    storage_account_name = "stpspreportstate"
    container_name       = "tstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  version = "~> 1.42.0"
}

# Create a new Resource Group 
resource "azurerm_resource_group" "resource_group" {
  name     = var.resource_group_name
  location = var.location

  tags = var.tags
}
