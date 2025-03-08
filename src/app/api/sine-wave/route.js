import fs from "fs";
import path from "path";
import Papa from "papaparse";

export async function GET(request) {
  const filePath = path.join(process.cwd(), "public", "data.csv");

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({ error: "CSV file not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const dataX = [];
  const dataY = [];
  let rowCount = 0;

  // Stream the CSV file
  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });

  // Wrap Papa.parse in a Promise to handle streaming asynchronously
  await new Promise((resolve, reject) => {
    Papa.parse(fileStream, {
      delimiter: ";",
      step: (result) => {
        const [x, y] = result.data;
        dataX.push(parseFloat(x));
        dataY.push(parseFloat(y));
        rowCount++;
      },
      complete: () => resolve(),
      error: (err) => reject(err),
    });
  }).catch((err) => {
    return new Response(
      JSON.stringify({ error: "Error parsing CSV", details: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  });

  // Return the full dataset
  return new Response(
    JSON.stringify({ x: dataX, y: dataY, totalRows: rowCount }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
