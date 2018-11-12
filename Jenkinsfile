pipeline {
    agent any
    
    tools {nodejs "nodejs"}
    
    stages {
        stage("Installation") {
            steps {
                git "https://github.com/pliantmeerkat/cooking.git"
                sh "npm install"
                sh "npm install -g eslint"
            }
        }
        stage("Testing") {
            steps {
                sh "npm test"
            }
        }
        stage("Code Quality") {
            steps {
                // sh "eslint lib public test"
                echo "--Hint-- You can fix errors easily by entering 'eslint --fix lib public test'"
            }
        }
    }
}