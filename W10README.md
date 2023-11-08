Welcome back to INFO-I400/590! This week, we'll integrate Firebase into your Gradebook App for data storage and user authentication. The aim is to deepen your understanding of Firebase in React Native projects, by having you practice some of the concepts we learned this past week!

Given that Firebase is a **BaaS**, this assignment will officially mean that the minimum viable product (MVP) of your Gradebook Applications are complete! Congratulations on "finishing" your first ever React Native Application :)

In order to ensure that everything is set up successfully, the first portion of this assignment will be *migrating your Gradebook Code to a new Github Repository*. Before diving into the Firebase integration, let's make sure your project is set up on GitHub. This will make version control and submission easier. 

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup: Local Project and GitHub Repository](#initial-setup-local-project-and-github-repository)
3. [Initialize Firebase and Configure Environment Variables](#initialize-firebase-and-configure-environment-variables)
4. [Firestore Integration](#firestore-integration)
5. [Firebase Hosting](#firebase-hosting)

## Prerequisites

1. Node.js and npm: Make sure to have them installed. [Node.js Download](https://nodejs.org/)
2. Expo CLI: Run `sudo npm install -g expo-cli`.
3. Firebase Account: Create a new project on the [Firebase Console](https://console.firebase.google.com/).

## Initial Setup: Local Project and GitHub Repository

### Steps:

1. **Initialize a New Expo Project**: Run the following command to create a new Expo project. You'll be prompted to choose a template; select "Blank".
    ```bash
    expo init Gradebook-App
    ```
  
2. **Navigate Into Your Project**: 
    ```bash
    cd Gradebook-App
    ```
   
3. **Install Required Packages**: Add Firebase, React Navigation, and React Native Web.
    ```bash
    npm install firebase @react-navigation/native react-native-web
    ```

4. **Test Your Installation**: Make sure everything works as expected by running:
    ```bash
    expo start
    ```
   
5. **Create a New GitHub Repository**: Name it `Gradebook-App` or something similar.

6. **Initialize and Push**: Initialize a Git repository in your project and push it to GitHub.
    ```bash
    git init
    git add .
    git commit -m "Initial commit with Expo, Firebase, React Navigation, and React Native Web"
    git remote add origin https://github.com/casey-fan/Gradebook-App.git
    git push -u origin master
    ```

7. **Add a README**: Create a `README.md` in your repository with the following content:
    ```
    # INFO-I400/590 Gradebook Application
    Made in React Native and Firebase
    ```

8. **Commit and Push README**: Add the README to your repository and push the changes.
    ```bash
    git add README.md
    git commit -m "Add README"
    git push
    ```
9. **Add Collaborators**: Add Ayman (@aynnxn), Nikhil (@nmalisetty), and Chabane (@cmaidi) as collaborators for grading.
**Evaluation Criteria**: 
- GitHub repo should be correctly set up with an Expo project that includes Firebase, React Navigation, and React Native Web. 
- The repo should contain all this code and a README with the specified content.
- `package.json` should list Firebase as a dependency. [Official Firebase SDK Installation Guide](https://firebase.google.com/docs/web/setup)
- All collaborators should be added to your repository. 

---

Proceed with the Firebase integration as outlined in the rest of this assignment.

---
## Part 1: Initialize Firebase and Configure Environment Variables

#### 1.1 Firebase Initialization

1. Navigate to the [Firebase Console](https://console.firebase.google.com/), choose your project, and create a new web app.
2. Obtain your Firebase SDK configuration snippet.

#### 1.2 `.env` Setup for Configuration

For regular React:

- Install dotenv: `npm install dotenv`
- In `.env`, place your variables:
    
    ```bash
    API_KEY=your-api-key
	```

For Expo:

- In `app.json`, add your Firebase config:
    ```json
    "extra": { 
	    "apiKey": "your-api-key", // ... other config
    }
	```

To use environment variables stored in the `app.json` in Expo, you'll want to utilize the `Constants` object from Expo's `expo-constants` package. In `firebaseConfig.js`, use Constants to access these variables:
```javascript
import Constants from 'expo-constants';
const { apiKey } = Constants.manifest.extra;

const firebaseConfig = {
  apiKey: apiKey,
  // ... other config
};

```
*Documentation: [Expo: Environment Variables](https://docs.expo.dev/guides/environment-variables/)*

**Evaluation Criteria**: 
- `.env` should be correctly set up, and Firebase initialization should be successful.
- For Expo (if you choose to use Expo dotenv), `.env` should be correctly set up in `app.json`, and `firebaseConfig.js` should successfully utilize the environment variables.


## Part 2: Firestore Database and Data Population

### 1. **Choice of Firebase Database and Data Population**
- For handling JSON-like structures, Firebase offers two main types of databases: Firestore and Realtime Database. Firestore is more scalable and offers complex queries and more features, so we would recommend Firestore for new projects. We spoke in class about the differences, naming scheme, and how to see your data in the Google Cloud Console. Feel free to check the recordings for more.

## Firestore Integration

### 2.1 Firestore Setup
1. Navigate to your Firebase Console.
2. Go to the `Firestore Database` section and click on `Create Database`.
3. Choose `Start in test mode` and `Enable`.

- After the database is ready, navigate to it and click on `Start Collection`.
- Enter `students` as the Collection ID and hit `Next` to create the collection.
  
### 2.2 Data Handling Component

Create a new React component named `FirebaseFetcher.js` for fetching Firestore data. This component should be imported in `App.js`.

```javascript
// FirebaseFetcher.js
import { useEffect } from 'react';
import firebase from './firebaseConfig';

export const FirebaseFetcher = () => {
  useEffect(() => {
    const db = firebase.firestore();
    const fetchData = async () => {
      const data = await db.collection('students').get();
      data.docs.forEach(doc => console.log(doc.data()));
    };
    fetchData();
  }, []);
  
  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
};
```
In your `App.js`:
```javascript
import { FirebaseFetcher } from './FirebaseFetcher';

// Inside your main component
<FirebaseFetcher />
```

The above code is an example of how you can set up and connect a component that fetches data. Your task is to take the existing student data that you migrated over with the rest of your Gradebook code, and push it to your Firestore database. The end goal is that you fetch data from your database, route it into your components, and have it display in your applications. Below is an example of how to add data;
```javascript
const db = firebase.firestore();
// To add data
db.collection('yourCollection').add({
  key: 'value'
});
```
*Documentation: [Firestore: Add Data](https://firebase.google.com/docs/firestore/manage-data/add-data)*

The above code snippets, markdown documents used in class, class recordings, and documentation are all the support we can give without giving away the answer. Feel free to leverage Office Hours or our Discord if you have any extraneous questions or concerns. 

**Evaluation Criteria**:
- Correctly set up Firestore Database collection.
- Created React Native Component that adds data. 
- Created React Native Component that fetches data.
- Displays data through UI from Firebase. 
## Firebase Hosting

Hosting allows us to ensure that our applications are accessible in a location that is **not** our local device. For more information about hosting, check out the files from this past week, as well as the class recordings. 
### 3.1 Initialize Firebase Hosting
- Install the Firebase CLI if you haven't: 
```bash
npm install -g firebase-tools 
```

- Then, initialize your project by running:
```bash
firebase init hosting
```

### 3.2 Deploy the Application

- After initializing, deploy your app using:
```bash
firebase deploy
```

**Evaluation Criteria**: The application should be successfully deployed and accessible through the provided URL.

3.3 Connect your URL to the Github Repository
- In your Github Repository Settings, add the provided URL. This populates the URL with your repository, and allows users to click on your app. 

That's all for now! We're so proud of the work you've accomplished this semester, but it's not quite over yet! Keep pushing hard in these last few weeks as we bring everything together. As always, if you have any questions or concerns, feel free to reach out through the appropriate aforementioned channels. Good luck!
