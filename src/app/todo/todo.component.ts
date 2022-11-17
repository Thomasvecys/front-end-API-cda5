import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../utilisateur';
import { Tache } from '../tache';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  tache:Tache;

  utilisateur:Utilisateur;
  utilisateurListe:Array<Utilisateur>;

  constructor(private http: HttpClient) {

    this.tache=new Tache();
    this.tache.description="";
    this.tache.duree=0;
    this.tache.finit=false;
    this.tache.user=new Utilisateur();

    this.utilisateur=new Utilisateur();
    this.utilisateurListe=new Array<Utilisateur>;
    this.getUtilisateur();
  }


  ngOnInit():void {

  }

  public creerTache():void{
    this.http.post<Tache>("http://192.168.1.26:8080/Planning/rest/taches/", this.tache).subscribe(tache=>console.log(tache));
    this.tache=new Tache();
  }


  public getUtilisateur():void{
    this.http.get<Utilisateur[]>('http://192.168.1.26:8080/Planning/rest/users/').subscribe(data => {
        this.utilisateurListe = data;
        console.log(data);
    })
  }

}
