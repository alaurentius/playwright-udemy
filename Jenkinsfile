pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.0-jammy'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando repositorio...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                // Ensure browsers are installed if version mismatch occurs, though image usually has them.
                // sh 'npx playwright install --with-deps' 
            }
        }

        stage('Run API Tests') {
            steps {
                sh 'npm run apiTests'
            }
        }

        stage('Run Web Tests') {
            steps {
                sh 'npm run webTests'
            }
        }
    }

    post {
        always {
            script {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
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