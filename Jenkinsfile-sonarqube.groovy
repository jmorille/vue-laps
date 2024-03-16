pipeline {
    agent { label 'RHEL9' }

    triggers {
        cron(['develop', 'master'].contains(env.BRANCH_NAME ) ? '@midnight': '')
    }

    options {
        timestamps()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '2'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }



        stage('SonarQube Analysis') {
            steps {
                configFileProvider([configFile(fileId: 'add-build-vars.sh', variable: 'ADD_BUILD_VARS')]) {
                    sh 'source $ADD_BUILD_VARS'
                }
                script {
                    def props = readProperties file: 'jenkins-build-vars.properties'
                    echo "jenkins-build-vars.properties=${props}"
                    withSonarQubeEnv('sonarqube') {
                        nodejs(nodeJSInstallationName: 'NodeJS 18.x', configId: 'config-npm') {
                            withMaven(globalMavenSettingsConfig: 'maven-global-settings', mavenSettingsConfig: 'ditw-maven-settings', jdk: 'OpenJDK 17.x', maven: 'Maven 3.x', options: [artifactsPublisher(disabled: true)]) {
                                sh "mvn clean test $SONARQUBE_SCANNER4MVN_GOAL ${JAVA_OPTS_HTTPS_PROXY}"
                            }
                        }
                    }
                }
            }
        }

//        stage('Build Doc') {
//            when {
//                anyOf {
//                    environment name: 'GIT_BRANCH', value: 'develop'
//                }
//            }
//            steps {
//                nodejs(nodeJSInstallationName: 'NodeJS 18.x', configId: 'config-npm') {
//                    withMaven(globalMavenSettingsConfig: 'maven-global-settings', mavenSettingsConfig: 'ditw-maven-settings', jdk: 'OpenJDK 17.x', maven: 'Maven 3.x', options: [artifactsPublisher(disabled: true)]) {
//                        sh "mvn  package deploy"
//                    }
//                }
//            }
//        }

        stage('Archive Artifacts') {
            steps {
                script {
                    archiveArtifacts artifacts: 'target/*.tar.gz,target/*.jar,target/*.zip,target/*.xml,target/*.html,target/owasp-deps/*', followSymlinks: false
                }
            }
        }
        stage('Dependency Publish') {
            steps {
                script {
                    dependencyCheckPublisher pattern: 'target/**/owasp-deps/dependency-check-report.xml'
                }
            }
        }




    }
}
