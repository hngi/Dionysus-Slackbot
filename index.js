require('dotenv').config();

const SlackBot = require('slackbots');
const express = require('express');
const request = require('request');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded());
app.use(express.static('public'));

app.post('/sign-up', (req, res) => {
  console.log(req.body)
});

app.post('/sign-in', (req, res) => {
  console.log(req.body);
})

app.listen(process.env.PORT, ()=> {
  console.log('SERVER is ready!');
})

app.post('/save-conversation', (req,res) => {
  saveConversation();
})

const bot = new SlackBot({
  token: process.env.SLACK_BOT_AUTH,
  name: 'dionysus-bot'
});

bot.on('start', ()=> {
  const params = {
    icon_emoji: ':robot_face:'
  }

  bot.postMessageToChannel(
    'random',
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
  }else if(message.includes(' are you mad')){
    madQuestion();
  }else if(message.includes(' who are you')){
    aboutDionysus();
  }else if(message.includes(' hello')){
    helloReply();
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
        'random',
        `Conversation has been successfully saved locally :smiley:`,
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
    'random',
    "Type `/save-conversation` to save channel conversation",
    params
  );

}

function madQuestion(){
  const params = {
    icon_emoji: ":zany_face:"
  }

  bot.postMessageToChannel(
    'random',
    "Enter my dm and you'd find out :smirk:",
    params
  );
}

function aboutDionysus(){
  const params = {
    icon_emoji: ":bigsmile:"
  }

  bot.postMessageToChannel(
    'random',
    `I'm dionysus and i'm an intellectual property belonging to team Dionysus\n
    I don't understand humans yet, would you love to help me learn more about the humans?
    `,
    params
  );
}

function helloReply(){
  const params = {
    icon_emoji: ":bigsmile:"
  }

  bot.postMessageToChannel(
    'random',
    `Hi\n how can i help you :slightly_smiling_face:`,
    params
  );
}