const axios = require("axios");
const crypto = require("crypto");

const API_URL = "http://localhost:3000/device/real/query";
const TOKEN = "interview_token_123";

const generateSignature = (url, token, timestamp) => {
  return crypto
    .createHash("md5")
    .update(url + token + timestamp)
    .digest("hex");
};

const fetchBatch = async (snList) => {
  const timestamp = Date.now().toString();
  const signature = generateSignature("/device/real/query", TOKEN, timestamp);

  try {
    const response = await axios.post(
      API_URL,
      { sn_list: snList },
      {
        headers: {
          timestamp,
          signature,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log("429 received. Waiting 1 second and retrying...");
      await new Promise((r) => setTimeout(r, 1000));
      return fetchBatch(snList);
    }

    throw error;
  }
};

module.exports = {
  fetchBatch,
};
