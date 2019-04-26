FROM mherwig/alpine-java-mongo
COPY target/*.jar /app.jar
COPY docker/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
