gradle build
mv ./app/build/libs/server.war ./wildfly/standalone/deployments/server.war
./wildfly/bin/standalone.sh