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
  };

  return sessionClient
    .detectIntent(request)
    .then(res => {
      const result = res[0].queryResult;
      let params = {};
      if (result.intent.displayName === 'recipe') {
        params = processParameters(result.parameters);
      }
      return {
        intent: result.intent.displayName,
        text: result.fulfillmentText,
        params: params,
      };
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/** Process parameters field of Dialogflow response */
function processParameters(params) {
  ingredient = [];
  course = [];
  category = [];

  params.fields.ingredient.listValue.values.forEach((val, i) => {
    ingredient.push(val.stringValue.toLowerCase());
  });

  params.fields.course.listValue.values.forEach((val, i) => {
    course.push(val.stringValue);
  });

  params.fields.category.listValue.values.forEach((val, i) => {
    category.push(val.stringValue);
  });

  return {
    ingredient: ingredient,
    course: course,
    category: category
  }
};
  
module.exports = processMessage;
