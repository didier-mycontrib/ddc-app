export class Contact {
    constructor(
        public _id : string | null = null ,
        public nom : string ="",
        public prenom : string ="",
        public adresse : string="",
        public telephone : string="",
        public email : string="",
        public objet : string="",
        public message : string="",
        public date : string ="",  /*ex: "2018-07-01"*/
        public statut : string ="" , /*ex: "nouveau"*/
        public selection : boolean =false /*selection locale seulement*/
    ){}
}