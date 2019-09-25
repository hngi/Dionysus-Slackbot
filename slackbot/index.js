require('dotenv').config();
const request = require('request');

request(`https://slack.com/api/channels.history?token=${process.env.SLACK_AUTH_TOKEN}&channel=${process.env.CHANNEL}&pretty=1`, function(error, response, body){
  if(error){
    console.log("An error occured: ", error);
  }else if(response.statusCode === 200){
    console.log(body);
  }
})