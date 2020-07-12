sudo systemctl stop node_exporter
sudo systemctl disable node_exporter
# sudo rm /etc/systemd/system/node_exporter
sudo rm /etc/systemd/system/node_exporter.service
sudo rm /etc/systemd/system/node_exporter # and symlinks that might be related
sudo rm /usr/lib/systemd/system/node_exporter 
sudo rm /usr/lib/systemd/system/node_exporter # and symlinks that might be related
sudo systemctl daemon-reload
sudo systemctl reset-failed


#### without sudo
#systemctl stop node_exporter
#systemctl disable node_exporter
#rm /etc/systemd/system/node_exporter
#rm /etc/systemd/system/node_exporter # and symlinks that might be related
#rm /usr/lib/systemd/system/node_exporter 
#rm /usr/lib/systemd/system/node_exporter # and symlinks that might be related
#systemctl daemon-reload
#systemctl reset-failed