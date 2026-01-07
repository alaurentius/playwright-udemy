pipeline {
    agent any // Quitamos el bloque docker directo aquí para evitar el error de inspect

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    sh """
                    docker run --rm \
                        mcr.microsoft.com/playwright:v1.49.0-noble \
                        /bin/sh -c "npm install && npx playwright test --grep @api"
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Finalizado'
        }
    }
}