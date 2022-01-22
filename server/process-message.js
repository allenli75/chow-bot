const Dialogflow = require('@google-cloud/dialogflow');

const projectId = 'thing-sbdsib';
const sessionId = '123456';
const languageCode = 'en-US';

const config = {
    credentials: {
      private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
      client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    },
};

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

const processMessage = message => {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode,
        },
      },
    }

    return sessionClient
      .detectIntent(request)
      .then(res => {
        result = res[0].queryResult
        console.log(result);
        return {
          intent: result.intent.displayName,
          text: result.fulfillmentText
        };
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }
  
  module.exports = processMessage;
  