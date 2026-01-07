pipeline {
    // Definimos el agente globalmente. Todo el pipeline correrá DENTRO de este contenedor.
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            // args:
            // -u root: Ejecuta como root para evitar problemas de permisos escribiendo en el workspace de Jenkins
            // --ipc=host: Recomendado por Playwright para evitar crashes de memoria/comunicación en navegadores
            args '-u root --ipc=host'
        }
    }

    stages {
        // No hace falta stage de Checkout explícito, Jenkins lo hace automáticamente en Declarative Pipelines
        
        stage('Install Dependencies') {
            steps {
                // Ya estamos DENTRO del contenedor que tiene Node y Playwright preinstalado
                sh 'npm ci' 
            }
        }

        stage('Run API Tests') {
            steps {
                sh 'npx playwright test --grep @Web'
            }
        }
    }

    post {
        always {
             // Como usamos "agent docker", el reporte se genera dentro del contenedor pero en el volumen compartido.
             // Jenkins puede leerlo sin problemas al terminar.
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}