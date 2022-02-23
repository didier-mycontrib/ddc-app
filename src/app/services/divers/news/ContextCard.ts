export class ContextCard {
    constructor(
        public title :string = "default card title",
        public texte :string = "<i>default card <b>content</b></i> ",
        public footer : string | null = null , 
        public large_html_text : string| null = null    
    ){}
}

/*
{ "title" : "titre A1", 
"texte" : "<i>contenu</i> <b>A1</b>" , 
"footer" : '2018-02-01' , 
"large_html_text" : '...'
},

*/