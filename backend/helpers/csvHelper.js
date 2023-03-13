const createCsvWriter = require("csv-writer").createObjectCsvWriter;

module.exports.writeCsv = async (filename, header, data) => {
  const csvWriter = createCsvWriter({
    path: filename,
    header: header,
  });
  await csvWriter.writeRecords(data);
};
