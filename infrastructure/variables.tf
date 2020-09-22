variable "tags" {
  type = map
  default = {
    environment = "Production"
    terraform   = "True"
  }
}

variable "location" {
  type    = string
  default = "westeurope"
}

variable "resource_group_name" {
  type    = string
  default = "rg-pagopa-psp-report-transaction"
}

# referce name to resource group and storage account 
# where is the PSP/ABI starting file
variable "resource_gp_pagopa" {
  type    = string
  default = "rg-pagopa-app-logic"
}

variable "st_pagopa_psprep" {
  type    = string
  default = "pagopatransctions"
}
