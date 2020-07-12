#!/bin/bash
cd /tmp
curl -LO https://github.com/prometheus/node_exporter/releases/download/v1.0.0/node_exporter-1.0.0.linux-amd64.tar.gz
tar -xvf node_exporter-1.0.0.linux-amd64.tar.gz
mv node_exporter-1.0.0.linux-amd64/node_exporter /usr/local/bin/
#sudo useradd -rs /bin/false node_exporter
cat >> /etc/systemd/system/node_exporter.service <<EOF
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=cloud_user
Group=cloud_user
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl start node_exporter
