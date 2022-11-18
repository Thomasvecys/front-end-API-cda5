import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../utilisateur';
import { Tache } from '../tache';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [CookieService]
})

export class TodoComponent implements OnInit {
  tache:Tache;

  utilisateur:Utilisateur;
  utilisateurListe:Array<Utilisateur>;
  options: any;
  constructor(private http: HttpClient, private cookieService: CookieService,) {


    this.tache=new Tache();
    this.tache.description="";
    this.tache.duree=0;
    this.tache.finit=false;
    this.tache.user=new Utilisateur();
    this.getUtilisateur();
    this.utilisateur=new Utilisateur();
    this.utilisateurListe=new Array<Utilisateur>;

  }


  ngOnInit():void {

  }




  public creerTache():void{
    console.log(this.cookieService.get('token'));
    let HttpHead = new HttpHeaders().set('Authorization', "Bearer " + this.cookieService.get('token'));


    this.http.post<Tache>("http://192.168.1.26:8080/Planning/rest/taches/", this.tache,  { headers:HttpHead }).subscribe(tache=>console.log(tache));
    this.tache=new Tache();
  }


  public getUtilisateur():void{
    console.log(this.cookieService.get('token'));
    let HttpHead = new HttpHeaders().set('Authorization', "bearer " + this.cookieService.get('token')).set('Access-Control-Allow-Origin', ' http://192.168.1.26:8080/Planning/rest/users/');



    this.http.get<Utilisateur[]>('http://192.168.1.26:8080/Planning/rest/users/', { headers:HttpHead }).subscribe(data => {
        this.utilisateurListe = data;
        console.log(data);
    })
  }

}
