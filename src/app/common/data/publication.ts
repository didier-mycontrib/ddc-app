export class Publication /* news publication/post */{
    constructor(
        public id : string | null = null,
        public titre : string ="", /* 'titre du post"  */
        public fichier_image_name : string = "", /* éventuelle image  */
        public resume : string="", /*"texte court avec balises html simples"  */

        /*l'un  des 3 attributs suivants est souvent non null de manière exclusive :*/
        public fichier_details_name : string | null = null, /* "details_xy.pdf"  */
        public texte_complet : string| null = null, /* texte long avec balises html simples  */
        public lien_externe : string| null = null, /* "http://partie_autre_site.html"  */

        public date: string="", /* "2018-06-25" */

        public selection : boolean = false ,/*selection locale seulement */
    ){}
}

/*
publication = { categorie : "" , titre : "" , 
                 fichier_image_name : null ,  resume : "" , 
                 fichier_details_name : null , texte_complet : null , 
                  lien_externe : null , date : "2018-06-01", 
                  };
*/