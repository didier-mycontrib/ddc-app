npm install -s bootstrap (v5)
ng add @angular/material
npm install angular-oauth2-oidc --save
============
pas de fontawesome , pas de @auth0/angular-jwt 
-------------
à court terme : npm install ngx-bootstrap@latest --legacy-peer-deps -s
à long terme pas de ngx-bootstrap
--------------
NB: for silent-refresh in popup , we need to:

* add in angular.json:

"assets": [
              "src/favicon.ico",
              "src/assets",
              "src/silent-refresh.html"
            ],

* src/silent-refresh.html (as in https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/silent-refresh.html)            
