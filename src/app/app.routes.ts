import { Routes } from '@angular/router';
import { Todolist } from './todolist/todolist';
import { Registration } from './registration/registration';
import { Login } from './login/login';
import { Todoform } from './todoform/todoform';
import { Editform } from './editform/editform';

export const routes: Routes = [

    {path: '', component:Login},
    {path: 'registration', component:Registration},
    {path: 'todolist', component:Todolist},
    {path: 'todoform', component:Todoform},
    {path: 'editform/:id', component: Editform}
];
