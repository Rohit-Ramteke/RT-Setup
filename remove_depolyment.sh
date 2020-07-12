

#STEP 1: Remove volume and folders for compose file to work

sudo rm -rf $RT_HOME/prometheus
sudo rm -rf $RT_HOME/grafana
sudo rm -rf $RT_HOME/alertmanager
sudo rm -rf $RT_HOME/web_app