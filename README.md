# Waether Channel

No diretório do projeto você pode executar:

## FRONTEND
### Command `yarn start`

Executar app em ambiente de desenvolvimento:
Frontend [http://localhost:3000](http://localhost:3000)

### Dependências:
- primeflex: 2.0.0
- primeicons: 4.1.0
- primereact: 6.5.1
- react-router-dom: 5.3.0

## BACKEND
No momento a conexáo com o banco de dados está fixada no código, sendo necessário utilizar a configuração abaixo:
`NAME=postgres, USER=postgres, PASSWORD=postgres, HOST=localhost, PORT=5432`
Executar scripts:
- `python manage.py makemigrations apiweather`
- `python manage.py migrate`  
- `python manage.py runserver`

Executar api em ambiente de desenvolvimento:
API - Backend [http://localhost:8000](http://localhost:8000)
### Dependências:
- djangorestframework
- django
- psycopg2
- django-cors-headers
