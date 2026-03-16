import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
   registerForm: any;
   message = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {

    
    this.registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  }

  
  register() {
    if(this.registerForm.invalid){
      this.message = "Please fill the form correctly!";
      return;
    }

    const data = this.registerForm.value;

    if(data.password !== data.confirmPassword){
      this.message = "Passwords do not match!";
      return;
    }

    // check for duplicate email
    this.apiService.getUserByEmail(data.email).subscribe(existingUsers => {
      if (existingUsers.length > 0) {
        this.message = 'Email already registered!';
        return;
      }

      // save to database
      const user = { name: data.name, email: data.email, password: data.password };
      this.apiService.register(user).subscribe(() => {
        this.message = 'Registration Successful!';
        this.registerForm.reset();

        
        this.router.navigate(['/login']);
      });
    });

}

}
