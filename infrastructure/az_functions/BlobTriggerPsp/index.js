const crypto = require("crypto");
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, myBlob) {
  context.log(
    "JavaScript blob trigger function processed blob \n Blob:",
    context.bindingData.blobTrigger,
    "\n Blob Size:",
    myBlob.length,
    "Bytes\n"
  );
  const header = "pspname,abi,containername";
  const lista = String(context.bindings.myBlob).split("\n").slice(1);
  const psp_abi = lista.map((e) => [e.split(";")[0], e.split(";")[2]]);
  let psp_containernames = [header];
  let containerName = "";
  for (e of psp_abi) {
    context.log(`For psp ${e[0]} with abi ${e[1]} hash ${getShortHmac(e[1])}`);
    containerName = `cont${e[1]}${getShortHmac(e[1])}`;
    psp_containernames.push(`${e[0]},${e[1]},${containerName}`);
    createContainers(containerName).catch((err) => {
      console.error("Error running :", err.message);
    });
  }

  context.bindings.outputBlob = psp_containernames.join("\n");
};

const getShortHmac = (message, len = 12) => {
  const key = "pagopa$4t4g3148fny2y4fy23fr";

  return crypto
    .createHmac("sha256", key)
    .update(message)
    .digest("hex")
    .slice(2, len);
};

async function createContainers(containerName) {
  const STORAGE_CONNECTION_STRING =
    "DefaultEndpointsProtocol=https;AccountName=stpspreportsfatture;AccountKey=IWQZqEeocsnl//+g+9SndzNedBfBG0T6vIPZNQ9NQDVtYiGtwbd0VwC+VDAYmgq8eM8qda97ffUNsNm712tQIw==;EndpointSuffix=core.windows.net";
  // Note - Account connection string can only be used in node.
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    STORAGE_CONNECTION_STRING
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  context.bindings(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );
}
