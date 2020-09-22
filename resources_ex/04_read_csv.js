const csv = require("csv-parser");
const fs = require("fs");

const filepath = "./pagopa-psp_short.csv";

fs.createReadStream(filepath)
  .on("error", () => {
    // handle error
  })

  .pipe(csv({ separator: ";" }))
  //   .on("data", (row) => {
  //     console.log(row);
  //   })
  .on("data", (row) => {
    console.log(row);
    let str = `${row["Denominazione"]}  ${row["CodiceFiscale"]}  ${row["CodiceABI"]}`;
    console.log(str);
  })
  .on("end", () => {
    // handle end of CSV
  });
