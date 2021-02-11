const request = require("request");
let MyIPApi = "https://api.ipify.org/?format=json";
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request(MyIPApi, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body);
    let ip = data.ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIP;

module.exports = fetchMyIP;
