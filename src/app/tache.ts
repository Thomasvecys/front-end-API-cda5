import { Utilisateur } from "./utilisateur";

export class Tache {
  public description: string;
  public duree: Number;
  public finit: Boolean;
  public user: Utilisateur;


  constructor(){
    this.description="";
    this.duree=0;
    this.finit=true;
    this.user=new Utilisateur;
  }

}
