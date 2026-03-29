import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  userName = localStorage.getItem('userName') || 'User';
  constructor(private router: Router) {}

  logout(){
  localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
    }


}
