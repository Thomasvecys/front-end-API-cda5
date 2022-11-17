import { Component } from '@angular/core';

import { Utilisateur } from './utilisateur';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monAppli';
  nombre:number=5;
  utilisateur:Utilisateur;
  status:boolean=true;

  constructor(){
   this.title="truc";
   this.utilisateur=new Utilisateur();
   this.utilisateur.username = "THOMAS";

  }
  public changeStatus():void{
    this.status=!this.status;
  }




}
