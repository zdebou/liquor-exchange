# Prerekvizity

- Maven
- GIT
- MongoDB (pro správu např. MongoDB Compass)

# Instalace

```
git clone https://github.com/zdebou/liquor-exchange.git
cd liquor-exchange/src
mvnw install
```

Stalo se mi, že selhalo spuštění `npm install` na chybě *CreateProcess error=193, %1 is not a valid Win32 application* a potom mi pomohlo toto:
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

- doporučuji plugin pro Lombok
- Hot Swap - aplikace se při změně automaticky zbuildí a restartuje. Je to vlastnost modulu spring-boot-devtools, ale aby to fungovalo v IDEA, musel jsem jít podle tohoto návodu: https://dzone.com/articles/spring-boot-application-live-reload-hot-swap-with
- pro automatický refresh je třeba do prohlížeče přidat plugin LiveReload (Firefox nebo Chrome)
- pro práci na frontendu je třeba spustit `npm run watch`

# Verzování a práce s GITem

Budeme určitě používat *developer branches* a kdo chce, tak může dělat *feature brnaches*. Vývoj a přidávání vlastního kódu je potřeba dělat ve vlastní větvi a následně udělat pull request! Nikdo prosím nedělejte commit do **master**, ale pouze do vlastní větve.

# Build WAR

```
mvnw clean install spring-boot:repackage
```

# Návody a tutoriály

- Spring Boot: https://spring.io/guides/gs/spring-boot/
- React & Spring Data: https://spring.io/guides/tutorials/react-and-spring-data-rest/
- Debugging in Spring: https://www.baeldung.com/spring-debugging
- Auto reload: https://dzone.com/articles/spring-boot-developer-tools-and-live-reload
- MongoDB:
 - https://www.tutorialspoint.com/mongodb/
 - https://medium.com/founding-ithaka/setting-up-and-connecting-to-a-remote-mongodb-database-5df754a4da89
 - https://docs.mongodb.com/manual/tutorial/enable-authentication/
 - https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/
- Lombok: https://projectlombok.org/
