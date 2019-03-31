# Prerekvizity

- Maven: https://maven.apache.org/download.cgi
- GIT

# Instalace

```
git clone https://github.com/zdebou/liquor-exchange.git
cd liquor-exchange/src
mvnw install
```

Stalo se mi, že selhalo spuštění `npm install` na chybě *CreateProcess error=193, %1 is not a valid Win32 application*, potom pomohlo toto:
```
mvnw dependency:purge-local-repository -DmanualInclude=com.github.eirslett:node
mvnw clean package
```

# Spuštění

```
mvnw spring-boot:run
```

Aplikace teď běží adrese `http://localhost:8080`.

# Vývoj
