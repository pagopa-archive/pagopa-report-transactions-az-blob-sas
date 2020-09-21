resource "azurerm_storage_account" "stpspreports" {
  name                     = "stpspreportsfatture"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# resource "azurerm_storage_container" "contpspreports" {
#   name                  = "contpspreportsfatture"
#   storage_account_name  = azurerm_storage_account.stpspreports.name
#   container_access_type = "private"
# }

# resource "azurerm_storage_blob" "example" {
#   name                   = "my-awesome-content.zip"
#   storage_account_name   = azurerm_storage_account.example.name
#   storage_container_name = azurerm_storage_container.example.name
#   type                   = "Block"
#   source                 = "some-local-file.zip"
# }
