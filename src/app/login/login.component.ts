import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../utilisateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CookieService]
})
export class LoginComponent implements OnInit {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    observe: 'response' as 'response'
};

configUrl = 'assets/config.json';

cookie_name='';

  utilisateur:Utilisateur;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private cookieService: CookieService,
    private httpClient: HttpClient,
    public router: Router) {
      this.utilisateur=new Utilisateur();
      this.utilisateur.password="";
      this.utilisateur.username="";
    }

  ngOnInit(): void {
  }

  public loginUser(): void {



    /*this.httpClient.post<Utilisateur>(`http://192.168.1.26:8080/Planning/rest/token`, this.utilisateur, this.httpOptions)
    .subscribe( function(cookie_name) {
      console.log(cookie_name.headers('set-cookie'));
    });
*/

    this.httpClient.post<any>(`http://192.168.1.26:8080/Planning/rest/token`, this.utilisateur)
        .subscribe( (res)=>
          this.setCookie(res.name, res.value)
        )
        console.log(this.getAccessToken())

    //.subscribe( cookieValue => console.log(cookieValue));


    //this.authService.login(this.loginForm.value)
  }

  public getAccessToken() {
   return this.cookie_name = this.cookieService.get('token');
  };

  public setCookie(name: string, value: string){
    this.cookieService.set(name, value);
  }

  public createUtilisateur():void{
    this.httpClient.post<Utilisateur>("http://192.168.1.26:8080/Planning/rest/token", this.utilisateur).subscribe(val=>console.log(val));

    /*this.listeTache.push(this.tache);
    this.tache = new Tache();*/
  }

}
