import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { TodoComponent } from './todo/todo.component';
const routes: Routes = [
  { path: 'utilisateur', component: UtilisateurComponent },
  { path: 'tache', component: TodoComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
