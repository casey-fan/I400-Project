## Prerequisites

- Make sure you have Node.js and npm installed on your system. If not, download and install them from [here](https://nodejs.org/).
- Install Expo CLI:
  ```bash
  npm install -g expo-cli
  ```
- A Firebase account and a new Firebase project. Create one at the [Firebase Console](https://console.firebase.google.com/).

## Installing Firebase in a React Native + Expo Project

### Step 1: Create a New Expo Project

If you don't have an Expo project yet, create one using the following command:

```bash
expo init YourProjectName
```

Choose a template and wait for the project to initialize.

### Step 2: Install Dependencies

Navigate into your project folder:

```bash
cd YourProjectName
```

Now install the Firebase JavaScript SDK:

```bash
npm install firebase
```
### Step 3: Initialize Firebase

1. Navigate to the [Firebase Console](https://console.firebase.google.com/), and choose your project.
2. Go to Project Settings and under "Your apps," select the option to create a new web app.
3. Copy the Firebase SDK snippet.

Create a new file in your project called \`firebaseConfig.js\`. Paste your Firebase SDK snippet here and initialize Firebase:

```javascript
import * as firebase from 'firebase';

const firebaseConfig = {
  // Your Firebase Configuration Here (apiKey, authDomain, etc.)
  apiKey: "your-api-key", 
  authDomain: "your-auth-domain", 
  databaseURL: "your-database-url", 
  projectId: "your-project-id", 
  storageBucket: "your-storage-bucket", 
  messagingSenderId: "your-messaging-sender-id", 
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
```

Replace the placeholder values with your actual Firebase configuration details.

### Step 4: Import and Use Firebase

Now you can import Firebase into any file where you need it. For example, to add a new user document to a Firestore collection:

```javascript
import firebase from './firebaseConfig';

// Example: Add a user to Firestore
firebase.firestore().collection('users').add({
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```
## Using Expo Web for Firebase Hosting

### Step 1: Install Firebase CLI

Open a new terminal window and install the Firebase CLI:

```bash
npm install -g firebase-tools
```
### Step 2: Log in to Firebase

Log in to your Firebase account:

```bash
firebase login
```

Follow the on-screen instructions to authenticate.

### Step 3: Build Expo Web Version

Navigate back to your project directory and run:

```bash
expo build:web
```

This will generate a \`web-build\` folder containing the web version of your Expo app.

*Note: If you get an error regarding your stylesheet, make sure to install RN Web!*
```bash
npm install react-native-web
```
### Step 4: Initialize Firebase Hosting

In your project directory, initialize Firebase Hosting:

```bash
firebase init hosting
```

When prompted, choose to deploy from the \`web-build\` folder.

### Step 5: Deploy to Firebase

Run the following command to deploy your web app:

```bash
firebase deploy --only hosting
```

You'll get a URL where your web app is hosted. Visit this URL to see your live Expo Web app.

That's it! You have successfully integrated Firebase into a React Native + Expo project and hosted its web version on Firebase Hosting.

# Firebase OAuth and Firebase Cloud Firestore

In order to set up both OAuth and Firestore, we must amend our Firebase Config with the following modules;
```javascript
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
```

Note the amendment that we have made;
```diff
import * as firebase from 'firebase';
++ import 'firebase/firestore';
++ import 'firebase/auth';
```

## Firestore

Now we can use Firestore in our components. Below is an example of how to use Firestore with both databases;
```js
// The following is an example of Firebase Firestore (NoSQL database) implementation within a component. 
import { firebase } from './firebaseConfig';

const db = firebase.firestore();

// Fetch data
db.collection('collectionName').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});

// Add data
db.collection('collectionName').add({
  key: 'value',
  anotherKey: 'anotherValue'
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});
```

```js
// The following is an example of Firebase Realtime Database implementation within a component. 
import { firebase } from './firebaseConfig';

const db = firebase.database();

// Fetch data
db.ref('/path/to/data').once('value').then((snapshot) => {
  console.log(snapshot.val());
});

// Add data
db.ref('path/to/data').set({
  key: 'value',
  anotherKey: 'anotherValue'
}, (error) => {
  if (error) {
    console.error("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  }
});
```
## Firebase OAuth:

To implement Firebase OAuth, you can use the `signInWithPopup` method provided by Firebase. Here's an example of how to use it with Google OAuth:
```js
import { firebase } from './firebaseConfig';

const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then((result) => {
  console.log(result.user);
}).catch((error) => {
  console.error(error);
});
```
