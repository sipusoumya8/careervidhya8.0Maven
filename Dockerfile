# Pull base image
From tomcat:8-jre8

# Maintainer
MAINTAINER "Rajkiran <rajkiran@cvcorp.in>"

# Copy to images tomcat path
ADD CareerVidhya_Operations8.0-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/
