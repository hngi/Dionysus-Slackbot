# TESTING THE BOT

- Request an invite to join the bot testing slack workspace form @hic
- clone the repo and CD into slackbot
- run `npm install` to install npm packages
- run `npm test` on the terminal to see a return json conversation history

**If you want to test this bot locally on your own slack workspace make sure to change the SLACK_BOT_AUTH and SLACK_USER_AUTH codes respectively and also update the CHANNEL ID** 

The dionysus both should work

# HOW TO USE THE BOT

**The bot can be interacted with in two ways.**
1. By using a slash command:
in any channel call `/save-conversation` and the bot will reply with a `conversation saved` response. This command creates a slack.json file that holds the conversation history.

2.  By real time interaction:
interact with the bot in real time by typing `@dionysus help` it will respond with `to save a conversation type /save-conversation.`

**Your conversation will be saved in the external drive.**
