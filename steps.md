## Create image for selection of metrics UI
sudo docker image build --tag kartik468/web-app:v0.0.1 .

sudo docker push kartik468/web-app:v0.0.1

## setup env variables
RT_ROOT="/home/kartikr3/RT_setup"
RT_HOME="/home/kartikr3/RT_setup/RT_home"
RT_FILES="/home/kartikr3/RT_setup/RT_files"

## list images
docker images

## create container from image
sudo docker container run -it --publish 8080:8080 <image-id>


sudo docker container run -it --publish 3001:3001 <image-id>

# List running containers:
docker ps

## nginx (ssl/tls)

references
- https://github.com/prometheus-community/prometheus-playground/tree/master/nginx
- https://prometheus.io/docs/guides/tls-encryption/

### generate hta password
```bash
htpasswd -c /etc/nginx/.htpasswd admin

# current username/password:  admin/prom
```
### prometheus url
https://13.64.96.103/prometheus

admin/prom

### generate certs

```bash
openssl req -newkey rsa:4096 -nodes -keyout certs/13.64.96.103.key -x509 -out certs/13.64.96.103.crt \
    -subj "/C=US/ST=OR/L=Portland/O=CNCF/OU=Developer advocacy/CN=13.64.96.103"
```
