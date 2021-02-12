const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  } else {
    console.log(ip);
    fetchCoordsByIP(ip, (error, coord) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      } else {
        console.log(coord);
        fetchISSFlyOverTimes(coord, (error, riseTime) => {
          if (error) {
            console.log("It didn't work!", error);
          } else {
            console.log(riseTime);
          }
        });
      }
    });
  }
});

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
