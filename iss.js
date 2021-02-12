const request = require("request");
let myIPApi = "https://api.ipify.org/?format=json";
let myCoord = "https://freegeoip.app/json/";
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request(myIPApi, function (error, response, body) {
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
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  let link = myCoord + ip;
  console.log(link);
  request(link, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      console.log("callback", callback);
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body);
    let coord = { latitude: data.latitude, longitude: data.longitude };
    callback(null, coord);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  let lat = coords.latitude;
  let lon = coords.longitude;
  let issFlyTime = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  console.log(lat, lon);
  request(issFlyTime, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      console.log("callback", callback);
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body).response;

    callback(null, data);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  // empty for now
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
