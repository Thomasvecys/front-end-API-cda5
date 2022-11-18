import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
  constructor(private http: HttpClient, private cookieService: CookieService,) {
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

    console.log(this.cookieService.get('token'));
    let HttpHead = new HttpHeaders().set('Authorization', "Bearer " + this.cookieService.get('token'));

    this.http.post<Utilisateur>("http://192.168.1.26:8080/Planning/rest/users/", this.utilisateur, { headers:HttpHead } ).subscribe(val=>console.log(val));
    this.utilisateur=new Utilisateur();

    /*this.listeTache.push(this.tache);
    this.tache = new Tache();*/
  }


  public getUtilisateur():void{

    console.log(this.cookieService.get('token'));
    let HttpHead = new HttpHeaders().set('Authorization', "Bearer " + this.cookieService.get('token'));
    this.http.get<Utilisateur[]>('http://192.168.1.26:8080/Planning/rest/users/',  { headers:HttpHead }).subscribe(data => {
        this.utilisateurListe = data;
        console.log(data);
    })
  }

}
