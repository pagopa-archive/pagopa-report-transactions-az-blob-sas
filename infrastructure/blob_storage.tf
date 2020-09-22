resource "azurerm_storage_account" "stpspreports" {
  name                     = "stpspreportsfatture"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "contpspapiforreports" {
  name                  = "ctpspabiforreports"
  storage_account_name  = var.st_pagopa_psprep
  container_access_type = "private"
}

data "azurerm_storage_account_sas" "stpspreports" {
  connection_string = azurerm_storage_account.stpspreports.primary_connection_string
  https_only        = true
  #   signed_version    = "2017-07-29"

  resource_types {
    service   = false
    container = false
    object    = true
  }

  services {
    blob  = true
    queue = false
    table = false
    file  = false
  }

  start  = "2020-09-22"
  expiry = "2020-12-31"

  permissions {
    read    = true
    write   = false
    delete  = false
    list    = false
    add     = false
    create  = false
    update  = false
    process = false
  }
}

output "sas_url_query_string" {
  value = data.azurerm_storage_account_sas.stpspreports.sas
}
