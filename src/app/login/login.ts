import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: any;
  message = '';

  constructor(private fb: FormBuilder,private apiService:ApiService, private router: Router) {

    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    async login() {
      if(this.loginForm.invalid){
        this.message = "Please fill the form correctly!";
        return;
      }

      const data = this.loginForm.value;
      const users = await firstValueFrom(this.apiService.getUserByEmail(data.email));

    if (users.length === 0) {
      this.message = 'Email not registered!';
      return;
    }

    const user = users[0]; 


      if (user.password !== data.password) {
        this.message = 'Invalid password!';
        return;
      }

      // store login state
      localStorage.setItem('isLoggedIn', 'true');
      // // store logged user info
      localStorage.setItem('userName', user.name);


        this.router.navigate(['/dashboard/statistics']);
        this.loginForm.reset();
    } 

    isSubmitDisabled(): boolean {
     const emailControl = this.loginForm.get('email');
     const passwordControl = this.loginForm.get('password');

        if (!emailControl || !passwordControl) return true; 

      
        return emailControl.invalid || passwordControl.invalid;
      }

}
