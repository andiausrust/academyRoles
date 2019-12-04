import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {error} from 'util';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                private router: Router
    ) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.minLength(6), Validators.required]],
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]]
        });
    }

    async register() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        await loading.present();

        console.log('loginForm value:', this.registerForm.value);
        this.authService.signup(this.registerForm.value).then(
            async res => {
             await loading.dismiss();
             const toast = await this.toastCtrl.create({
               duration: 3000,
               message: 'successfully created new account!'
             });
             await toast.present();
             await this.router.navigateByUrl('/login');
            }, error(async err => {
              await loading.dismiss();
              const alert = await this.alertCtrl.create({
                header: 'Error',
                message: err.message,
                buttons: ['OK']
              });
              await alert.present();
            }));
    }

}
