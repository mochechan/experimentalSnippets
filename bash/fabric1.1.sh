#!/bin/bash

cat <<EOF
installing:
docker community edition & docker-compose
golang, nodejs
fabric 1.1.0 with nodejs sdk 
EOF

function ec {
    errorlevel=$?
    echo errorlevel: $errorlevel 
    if [ "$errorlevel" -gt "0" ]; then 
        echo Install: The current errorlevel code is invalid. Please check. 
        exit $errorlevel;
    else 
        echo Install: so far so good. 
    fi
}

while [ 1 -eq 1 ] 
do
	apt_check=$(ps aux | grep apt | wc -l) 
	if [ $apt_check -gt 1 ]; then
		sleep 1
	else
		break
	fi
done


cd 
pwd
echo Press enter to continue
pause

sudo dpkg --configure -a 
ec 
sudo apt -y update 
ec 
sudo apt -y dist-upgrade 
ec 
echo "Defaults timestamp_timeout=999" | sudo tee -a /etc/sudoers.d/timeout
ec 
sudo apt -y install curl git jq vim htop software-properties-common ssh vim htop git socat expect build-essential meld screen git mercurial unzip zip make wget curl
ec 
git config --global push.default simple
git config --global core.editor vi
git config --global help.autocorrect 1
git config --global color.ui true
git config --global credential.helper cache
git config --global credential.helper "cache --timeout=99999999"
ec 
sudo apt -y remove docker docker-engine docker.io
ec
curl -fsSL get.docker.com -o get-docker.sh
ec
sudo sh get-docker.sh
ec
sudo usermod -aG docker $USER
ec

#sudo curl -L "https://github.com/docker/compose/releases/download/1.20.0-rc2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
downloadLink=$(curl -s 'https://github.com/docker/compose/releases' | grep -o '/docker/compose/releases/download/.*'docker-compose-`uname -s`-`uname -m` |head -1)
wget https://github.com$downloadLink
ec
sudo mv -v docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
ec
docker-compose --version
ec

cd ~

curl https://storage.googleapis.com/golang/go1.10.linux-amd64.tar.gz | sudo tar -zx --directory /usr/local 
ec

mkdir -pv ~/.go
tee -a ~/.bashrc <<EOF

export GOROOT=/usr/local/go
export GOPATH=$HOME/.go
export PATH=$PATH:/usr/local/go/bin:$GOROOT/bin:$GOPATH/bin

EOF

/usr/local/go/bin/go version 
ec

tee -a ~/.vimrc <<EOF

set number
set tabstop=2 

EOF


node -v
if [ "$?" != "0" ]; then

	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	ec 
	sudo apt install -y nodejs
	ec 

fi


docker ps
if [ $? -gt 0 ]; then
	echo "please reboot your ubuntu, and run this script again "
	exit 99;
fi

npm version
if [ $? -gt 0 ]; then
	echo "please install nodejs "
	exit 99;
fi

sudo apt -y install libtool libltdl-dev

rm -Rf $GOPATH/src/github.com/hyperledger
mkdir -pv $GOPATH/src/github.com/hyperledger
cd $GOPATH/src/github.com/hyperledger
git clone https://github.com/hyperledger/fabric.git
git clone https://github.com/hyperledger/fabric-ca.git
git clone https://github.com/hyperledger/fabric-sdk-node.git
git clone https://github.com/hyperledger/fabric-samples.git
git clone https://github.com/hyperledger/fabric-sdk-rest.git
git clone https://github.com/hyperledger/blockchain-explorer.git

TAG=x86_64-1.1.0
docker pull hyperledger/fabric-peer:$TAG
docker pull hyperledger/fabric-orderer:$TAG
docker pull hyperledger/fabric-couchdb:$TAG
docker pull hyperledger/fabric-ccenv:$TAG
docker pull hyperledger/fabric-javaenv:$TAG
docker pull hyperledger/fabric-kafka:$TAG
docker pull hyperledger/fabric-tools:$TAG
docker pull hyperledger/fabric-zookeeper:$TAG
docker pull hyperledger/fabric-ca:$TAG

docker tag hyperledger/fabric-peer:$TAG hyperledger/fabric-peer:latest
docker tag hyperledger/fabric-orderer:$TAG hyperledger/fabric-orderer:latest
docker tag hyperledger/fabric-couchdb:$TAG hyperledger/fabric-couchdb:latest
docker tag hyperledger/fabric-ccenv:$TAG hyperledger/fabric-ccenv:latest
docker tag hyperledger/fabric-javaenv:$TAG hyperledger/fabric-javaenv:latest
docker tag hyperledger/fabric-kafka:$TAG hyperledger/fabric-kafka:latest
docker tag hyperledger/fabric-tools:$TAG hyperledger/fabric-tools:latest
docker tag hyperledger/fabric-zookeeper:$TAG hyperledger/fabric-zookeeper:latest
docker tag hyperledger/fabric-ca:$TAG hyperledger/fabric-ca:latest

cd $GOPATH/src/github.com/hyperledger/fabric-samples/balance-transfer 
npm install
sed -i.bak s/45000/945000/g $GOPATH/src/github.com/hyperledger/fabric-samples/balance-transfer/node_modules/fabric-client/config/default.json

echo cd .go/src/github.com/hyperledger/fabric-samples/balance-transfer
echo ./runApp.sh  ./testAPIs.sh

