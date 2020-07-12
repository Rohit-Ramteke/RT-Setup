#!/bin/bash

## STEP 1: Creating volume folders for compose file to work
 
mkdir $RT_HOME/prometheus

mkdir $RT_HOME/grafana
mkdir -p $RT_HOME/grafana/config
mkdir -p $RT_HOME/grafana/grafana_storage
mkdir -p $RT_HOME/grafana/provisioning

mkdir -p $RT_HOME/alertmanager

mkdir -p $RT_HOME/web_app/web-interface-grafana-express
 
## STEP 2: Copy the following files / folders in below locations
 
# copy prometheus files
cp -r $RT_FILES/prometheus/prometheus.yml $RT_HOME/prometheus
cp -r $RT_FILES/prometheus/rules.yml $RT_HOME/prometheus

# copy grafana files
cp -r $RT_FILES/grafana/config/grafana.ini $RT_HOME/grafana/config
cp -r $RT_FILES/grafana/provisioning/datasources/ $RT_HOME/grafana/provisioning/
cp -r $RT_FILES/grafana/provisioning/dashboards/ $RT_HOME/grafana/provisioning/

# copy grafana files
cp -r $RT_FILES/alertmanager/alertmanager.yml $RT_HOME/alertmanager/alertmanager.yml

# copy web app files
cp -r $RT_FILES/web_app/web-interface-grafana-express/MRR_Dashboard.json $RT_HOME/web_app/web-interface-grafana-express/MRR_Dashboard.json

cp -r $RT_FILES/web_app/web-interface-grafana-express/.env $RT_HOME/web_app/web-interface-grafana-express/.env

cp -r $RT_FILES/web_app/web-interface-grafana-express/ui-config.json $RT_HOME/web_app/web-interface-grafana-express/ui-config.json

 
## STEP 3: Set permisions for grafana volume
 
chown -R 472:472 $RT_HOME/grafana/
 
## STEP 4: Start up docker-compose file 
 
# docker-compose up -d
 
## STEP 5: Install node exporter
 
#sudo ./node_exporter.sh
