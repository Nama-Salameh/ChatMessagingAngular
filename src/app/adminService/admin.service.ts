import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  admins: any[] = [];
  firestore: firebase.firestore.Firestore;

  constructor() {
    this.firestore = firebase.firestore();
    this.loadAdmins();
  }

  loadAdmins() {
    this.firestore
      .collection('Admin')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.admins.push({ id: doc.id, data: doc.data() });
        });
      })
      .catch((error) => {
        console.error('Error loading admins:', error);
      });
  }
}
