FROM java:8
MAINTAINER Rajkiran "rajkiran@cvcorp.in"


#tomcat
RUN mkdir /var/tmp/tomcat
RUN wget -P /var/tmp/tomcat http://www-us.apache.org/dist/tomcat/tomcat-8/v8.5.27/bin/apache-tomcat-8.5.27.tar.gz
RUN tar xzf /var/tmp/tomcat/apache-tomcat-8.5.27.tar.gz -C /var/tmp/tomcat
RUN rm -rf /var/tmp/tomcat/apache-tomcat-8.5.27.tar.gz

RUN mkdir /var/tmp/webapp
#ADD ./ /var/tmp/webapp
#RUN cd /var/tmp/webapp && mvn package && cp /var/tmp/webapp/target/CIJD.war /var/tmp/tomcat/apache-tomcat-8.5.27/webapps
ADD ./target/*.war /var/tmp/webapp
RUN cd /var/tmp/webapp && ls  -al
RUN cp -r /var/tmp/webapp/* /var/tmp/tomcat/apache-tomcat-8.5.27/webapps

EXPOSE 8585

CMD ["./var/tmp/tomcat/apache-tomcat-8.5.27/bin/catalina.sh","run"]

#RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
