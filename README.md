# FhirQuestionnaireServer

A Node.js Express app to:  
a) Present a FHIR Questionnaire rendered as an NHS.uk styled HTML web form and return completed FHIR QuestionnaireResponse  
b) Render a FHIR Appointment as an NHS.uk styled HTML web page

NHS.uk front end library https://nhsuk.github.io/nhsuk-frontend/

Install the usual way

1. clone repository locally

2. install it

```
npm install
```

3. run it

```
node ./app.js
```

or

```
nodemon ./app.js
```

4. Once app is running, access the rendered web page served from local Node.js Express server in e.g. your web browser at

```
http://localhost:3000/questionnaire
```

# Prettier

This repo uses https://prettier.io/  
To format all files with Prettier

```
npx prettier . --write
```
