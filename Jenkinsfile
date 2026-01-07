pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    // Montamos el directorio actual ($WORKSPACE) en /app dentro del contenedor
                    // y definimos /app como el directorio de trabajo (-w)
                    sh """
                    docker run --rm \
                        -v "\$WORKSPACE":/app \
                        -w /app \
                        -e CI=true \
                        mcr.microsoft.com/playwright:v1.49.0-noble \
                        /bin/sh -c "npm install && npx playwright test --grep @Api"
                    """
                }
            }
        }
    }

    post {
        always {
             // Opcional: Publicar reporte HTML si se configuró un volumen para persistirlo fuera del contenedor
             echo 'Pipeline finalizado'
        }
    }
}