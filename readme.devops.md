# Análisis Estático de Software:

[SonarCloud](https://sonarcloud.io/projects)

-   Se crea una cuenta vinculada a la de GitHub

-   Se cre una organización o se accede a una ya creada
-   Si existe en GitHub se mostraran todos los repos a los que se tenga acceso

Se ejecuta directamente el primer análisis del proyecto

En la "information" del proyecto se puede ver

-   Project Key [alce65_final-lists-ts]
-   Organization Key [alce65]

Para que incluya en el Análisis los datos de **coverage del testing** es necesario

-   Haber ejecutado los test con el coverage para que exista la correspondiente información en el proyecto
-   **desactivar el análisis automático** (Administration / Analysis Method) y
-   activar alguno de los basados en CI (Continuos Integration).

Entre ellos se encuentra el de **GitHub Actions** para lo que puede seguirse el [tutorial](https://sonarcloud.io/project/configuration?id=alce65_final-lists-ts&analysisMode=GitHubActions) incluido en la misma página de Administración de SonarCloud

-   In your GitHub repository, go to Settings > Secrets and create a new secret with the Name **SONAR_TOKEN** and the value provided by Sonar.

-   Add a new Github Action in the repository workflow (.github/workflows/sonar.yml)

```yml
name: Sonar Scanner
on:
    push:
        branches:
        - main
    pull_request:
        types: [opened, synchronize, reopened]
jobs:
    sonarcloud:
        name: SonarCloud
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            with:
                fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
            - name: Install modules
            run: npm ci
            - name: Testing coverage
            run: npm run test:prod #Change for a valid npm script
            env:
                JWT_SECRET: ${{ secrets.JWT_SECRET }}
            - name: SonarCloud Scan
            uses: SonarSource/sonarcloud-github-action@master
            env:
                GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
                SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

Create a configuration file in the root directory of the project and name it sonar-project.properties

```
sonar.projectKey=<alce65_01-ng-todo>
sonar.organization=<alce65>

# This is the name and version displayed in the SonarCloud UI.
#sonar.projectName=<01-ng-todo>
#sonar.projectVersion=<1.0>

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
sonar.sources=./src

sonar.test.inclusions=src/**/*.test.js

sonar.javascript.lcov.reportPaths=<coverage/01-ng-todo>
sonar.coverage.exclusions=
    src/index.js,
    src/index.tsx,
    src/**/*.test.*,
    src/**/*.spec.*,
    src/reportWebVitals.js
sonar.scm.provider=git

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8
```

# GitHub Actions
