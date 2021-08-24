const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: "WzYCLToTMWHj5Yr3fFwQeGVT9ZMGnRdm",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
