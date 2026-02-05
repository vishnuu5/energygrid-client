const { fetchBatch } = require("./apiClient");
const { sleep, generateSerialNumbers } = require("./utils");
const fs = require("fs");

const BATCH_SIZE = 10;
const RATE_LIMIT_DELAY = 1000;

const run = async () => {
  console.log("EnergyGrid Data Aggregator Started\n");

  const serialNumbers = generateSerialNumbers();
  const aggregatedResults = [];

  for (let i = 0; i < serialNumbers.length; i += BATCH_SIZE) {
    const batch = serialNumbers.slice(i, i + BATCH_SIZE);

    console.log(
      `Fetching batch ${i / BATCH_SIZE + 1} (${batch.length} devices)`,
    );

    const batchData = await fetchBatch(batch);
    aggregatedResults.push(...batchData);

    await sleep(RATE_LIMIT_DELAY);
  }

  console.log("\n All data fetched successfully");
  console.log(`Total devices fetched: ${aggregatedResults.length}\n`);

  console.log(JSON.stringify(aggregatedResults, null, 2));

  fs.writeFileSync(
    "final_output.json",
    JSON.stringify(aggregatedResults, null, 2),
  );

  console.log("Output saved to final_output.json");
};

run().catch((err) => {
  console.error(" Error occurred:", err.message);
});
