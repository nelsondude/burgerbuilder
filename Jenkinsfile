pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000 -u root:root'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Prepare') {
            steps {
                sh "npm install -g yarn"
            }
        }
        stage('Build') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
    }
}