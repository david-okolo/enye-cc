![Node.js CI](https://github.com/david-okolo/enye-cc/workflows/Node.js%20CI/badge.svg)

# Enye Cohort 4: Coding Challenge

A solution to locate nearest hospital, clinic, pharmacy or medical office. Inspired by the need during the COVID-19 pandemic.

Project's [Backend](https://github.com/david-okolo/enye-cc-backend)

### Technologies

- Reactjs
- TypeScript
- Auth0
- Apollo-GraphQL client
- Ant Design Library

### Application Requirements

**Core**
- Users should be able to search for Hospitals, Pharmacies, Clinics and Medical Offices
- Users should be able to see past results
    - There should be a place that a user can click to see all the results that have been searched on the app
    - Clicking on a past search result should trigger a request and the results should be displayed for the user.
    - Hint - You need to save the past searches in a database

**Authentication**
- User should be able to signup for the application
- User should be able to access the application using their email and password
- User should only be allowed to access the application if they are signed in

**GraphQL**
- Build a GraphQL layer that pulls the users specific search results from your database or API
- User should only see their own search history

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run deploy`

Builds the application for production and deploys it to github pages. Make sure you set the homepage attribute in your package.json
