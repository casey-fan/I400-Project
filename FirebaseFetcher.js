import { useEffect } from 'react';
// import firebase from './firebaseConfig';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";



export const FirebaseFetcher = () => {
    useEffect(() => {
      // const db = firebase.firestore();
      const fetchData = async () => {
        const data = await db.collection('notes').get();
        data.docs.forEach(doc => console.log(doc.data()));
      };
      fetchData();
    });
};  