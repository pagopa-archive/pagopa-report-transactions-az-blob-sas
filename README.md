# pagopa-report-transactions-az-blob-sas

Report transactions for PSP

- [pagopa-report-transactions-az-blob-sas](#pagopa-report-transactions-az-blob-sas)
  - [Prerequisites](#prerequisites)
  - [How to build infrastructure](#how-to-build-infrastructure)
  - [Step to get the desired blob](#step-to-get-the-desired-blob)
    - [By browser](#by-browser)
    - [Using `js` script](#using-js-script)

## Prerequisites

This repository contains the code and `terrafrom` infrastructure to put on the _PSP invoice report_ service related to `pagoPa` system.

- Infrastructure Requirements (_OPTIONAL only for `admin` user_)

  - You need a Azure active subscription ( in our case `DEV-PAGOPA`)
  - The [azure cli](https://docs.microsoft.com/it-it/cli/azure/install-azure-cli?view=azure-cli-latest) installed
  - [Terraform](https://www.terraform.io/downloads.html) 0.12.20 or grater installed

- Code requirements (_for all `guest` users_)
  - [Node.js and npm](https://nodejs.org/en/) installed

> **NOTE** : part of this project was done using [vscode azure function](https://docs.microsoft.com/it-it/azure/azure-functions/functions-develop-vs-code?tabs=csharp)

## How to build infrastructure

Login into your `azure` account and choose activate your subscription:

```
az login
az account set --subscription <your subscription>
```

Create the storage account for sharing your terraform state file:

```
cd infrastructure/
./config_storage_account.sh
```

> **NOTE** :You should run the previous command only the first time you set up the terraform workspace.

The command itself will end presenting you the access key of the storage account it creates:

`access_key: <your account key>`

Set the following env variable:

`export AZURE_STORAGE_KEY=<your account key>`

Spin up the infrastructure typing:

```
terraform init
terraform apply
```

if all right it'll see the following output with `SAS_TOKEN` using into `ACCOUNT_SAS` env variable :

```
Outputs:
sas_url_query_string = ?sv=blablalablalablalablalablalablalablalabla12345676890
```

## Step to get the desired blob

Here we show two types access to container/blob :

### By browser

From your browser typing

```
https://stpspreportsfatture.blob.core.windows.net/<CONTAINER_NAME>/<BLOB_NAME><SAS_TOKEN>
```

### Using `js` script

- Copy and rename the `sample.env` file into `.env`.

Then change the values between angle brackets of the environment variables with the appropriate values present on your [Azure portal account](https://azure.microsoft.com/it-it/account/) or provided to you. (`CONTAINER_NAME`, `BLOB_NAME` and `SAS_TOKEN`)

- After that in the folder where the file `package.json` is present, typing the following command :

```sh
npm i
```

- From your terminal console typing :

```
node anonymousCred2blob.js
```

if all right and all data are correct it'll show something like this :

```
Downloaded blob content: "Hello blob : )"
download-blob: 365.871ms
```
