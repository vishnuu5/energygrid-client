const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateSerialNumbers = () => {
  const serials = [];
  for (let i = 0; i < 500; i++) {
    serials.push(`SN-${i.toString().padStart(3, "0")}`);
  }
  return serials;
};

module.exports = {
  sleep,
  generateSerialNumbers,
};
