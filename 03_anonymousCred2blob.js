// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* 
 Setup: Enter your storage account name and SAS in main()
*/

const {
  BlobServiceClient,
  AnonymousCredential,
} = require("@azure/storage-blob");
const { AbortController } = require("@azure/abort-controller");

// Load the .env file if it exists
require("dotenv").config();

const ONE_MINUTE = 60 * 1000;

async function main() {
  const aborter = AbortController.timeout(30 * ONE_MINUTE);

  // Enter your storage account name and SAS
  const account = process.env.ACCOUNT_NAME || "";
  const accountSas = process.env.ACCOUNT_SAS || "";

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // List containers
  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net${accountSas}`,
    anonymousCredential
  );

  const containerName = process.env.CONTAINER_NAME;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = process.env.BLOB_NAME;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.time("download-blob");
  const downloadResponse = await blockBlobClient.download(0, aborter);
  const downloadedContent = await streamToString(
    downloadResponse.readableStreamBody
  );
  console.log(`Downloaded blob content: "${downloadedContent}"`);
  console.timeEnd("download-blob");
}

async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
