pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo 'ddc-app with dist/ddc-app already built in this V1 '
            }
		}
		stage('Checkout code') {
			steps {
			   ws("/conf-docker/frontends-angular/my-frontends/ddc-app") {
				  checkout scm
			   }
			}
		}
		stage('copy ddc-app from ./ddc-app/dist to ./frontends-content') {
			steps {
			    echo 'rsync -av --delete ./ddc-app/dist/ddc-app ./frontends-content OK but rsync not found'
			    ws("/conf-docker/frontends-angular/my-frontends") {
				     sh('rm -r ./frontends-content/ddc-app')
				     sh('cp -r ./resa-app/dist/ddc-app ./frontends-content')
				}
			}
		}
    }
}
