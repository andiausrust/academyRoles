import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth) {
    }

    signup(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        );
    }
}
