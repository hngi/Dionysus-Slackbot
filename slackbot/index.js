require('dotenv').config();

const SlackBot = require('slackbots');
const express = require('express');
const request = require('request');
const fs = require('fs');

const app = express();

app.listen(process.env.PORT, ()=> {
  console.log('SERVER is ready!');
})

app.post('/save-conversation', (req,res) => {
  saveConversation();
})

const bot = new SlackBot({
  token: process.env.SLACK_BOT_AUTH,
  name: 'jokebot'
});

bot.on('start', ()=> {
  const params = {
    icon_emoji: ':smiley:'
  }

  bot.postMessageToChannel(
    'general',
    "Hello i am @dionysus!",
    params
  );
})

bot.on('error', (err) => {
  console.log(err);
})

bot.on('message', (data) => {
  if(data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
})

function handleMessage(message){
  if(message.includes('save conversation')){
    saveConversation();
  }else if(message.includes(' help')){
    getHelp();
  }
}

function saveConversation(){
  request(`https://slack.com/api/conversations.history?token=${process.env.SLACK_USER_AUTH}&channel=${process.env.CHANNEL}&pretty=1`, (err, res, body)=>{
    fs.writeFile('slack.json', body, (err)=>{
      if(err) console.log(err);
      const params = {
        icon_emoji: ':smiley:'
      }

      bot.postMessageToChannel(
        'dionysus',
        `Conversation has being saved :smiley:`,
        params
      );
      console.log("Write Complete!");
    });
  });
}

function getHelp(){
  const params = {
    icon_emoji: ":question:"
  }

  bot.postMessageToChannel(
    'dionysus',
    "Type `/save-conversation` to save channel conversation",
    params
  )
}