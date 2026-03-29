import { Routes } from '@angular/router';
import { Todolist } from './todolist/todolist';
import { Registration } from './registration/registration';
import { Login } from './login/login';
import { Todoform } from './todoform/todoform';
import { Editform } from './editform/editform';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { loginAuthGuard } from './authentication/login-auth-guard';
import { DashStatistics } from './dash-statistics/dash-statistics';

export const routes: Routes = [

    {path: '', component:Home},
    {path: 'login', component:Login},
    {path: 'dashboard', component:Dashboard,
        canActivate: [loginAuthGuard],
        children:[
            {path: 'statistics', component:DashStatistics},
            {path: 'todolist', component:Todolist},
            {path: 'todoform', component:Todoform},
            {path: 'editform/:id', component: Editform},
            { path: '', redirectTo: 'statistics', pathMatch: 'full' }

        ]
    },
    {path: 'registration', component:Registration},
    
];
