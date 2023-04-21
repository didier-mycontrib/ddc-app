export class User{
    constructor(public username ="?" ,
                public authenticated=false,
                public roles="?",
                public grantedScopes : string[]= []){}
}