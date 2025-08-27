export class Ressource /* image , pdf, ... */{
    constructor(
        public id :  string | null = null,
        public titre : string = "" ,/* 'titre facultatif de la ressource " */
        public res_fic_name : string= "", /* nom du fichier (image ou pdf ou ...)*/
        public res_type : string="", /* type/role technique de ressource "pdf" , "image" , "video" , ...*/
        public res_categorie : string="", /*categorie fonctionnelle (ex: plan , ...)*/
        public date: string="", /* date éventuelle : "2018-06-25"*/

        public selection : boolean =false /*selection locale seulement*/
    ){}
}
