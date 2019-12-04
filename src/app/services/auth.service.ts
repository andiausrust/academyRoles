import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {from, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFirestore) {
    }

    signup(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(
            data => {
                console.log('data received from firebase on login with email and password', data);
                return this.db.doc(`users/${data.user.uid}`).set({
                    first_name: credentials.first_name,
                    last_name: credentials.last_name,
                    email: credentials.email,
                    role: 'USER',
                    permissions: [],
                    created: firebase.firestore.FieldValue.serverTimestamp()
                });
            });
    }

    signin(credentials): Observable<any> {
        return from(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password));
    }
}
