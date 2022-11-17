import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Utilisateur } from '../utilisateur';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})

export class UtilisateurComponent implements OnInit {
  utilisateur:Utilisateur;
  utilisateurListe:Array<Utilisateur>;
  constructor(private http: HttpClient) {
    this.utilisateur=new Utilisateur();
    this.utilisateur.password="";
    this.utilisateur.role="";
    this.utilisateur.username="";
    this.utilisateurListe=new Array<Utilisateur>;
    this.getUtilisateur();
   }

  ngOnInit(): void {
  }

  public createUtilisateur():void{
    this.http.post<Utilisateur>("http://192.168.1.26:8080/Planning/rest/users/", this.utilisateur).subscribe(val=>console.log(val));
    this.utilisateur=new Utilisateur();

    /*this.listeTache.push(this.tache);
    this.tache = new Tache();*/
  }

  public getUtilisateur():void{
    this.http.get<Utilisateur[]>('http://192.168.1.26:8080/Planning/rest/users/').subscribe(data => {
        this.utilisateurListe = data;
        console.log(data);
    })
  }

}
