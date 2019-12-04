import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
                private auth: AuthService,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.minLength(6), Validators.required]]
        });
    }

    async login() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading, ...'
        });
        await loading.present();

        this.auth.signin(this.loginForm.value).subscribe(
            async user => {
                await loading.dismiss();
            },
            async err => {
                await loading.dismiss();

                const alert = await this.alertCtrl.create({
                    header: 'Error',
                    message: err.message,
                    buttons: ['OK']
                });
                await alert.present();
            }
        );
    }

}
