FROM tomcat:8.5-alpine
VOLUME /tmp
RUN sh -c 'rm -rf /usr/local/tomcat/webapps/ROOT'
COPY target/*.war /usr/local/tomcat/webapps/ROOT.war
RUN sh -c 'touch /usr/local/tomcat/webapps/ROOT.war'
EXPOSE 8080
