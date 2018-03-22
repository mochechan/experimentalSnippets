FROM library/golang

RUN apt -y update && apt -y full-upgrade 

RUN go get -u github.com/whyrusleeping/gx &&\
	go get -u github.com/whyrusleeping/gx-go &&\
	go get -u github.com/ipfs/go-ipfs &&\
	cd $GOPATH/src/github.com/ipfs/go-ipfs &&\
	gx install &&\
	make install 

RUN	go get -d github.com/whyrusleeping/iptb 
RUN	cd $GOPATH/src/github.com/whyrusleeping/iptb &&\
	gx install && go install


#RUN	mkdir -pv /root/.go/src/github.com/whyrusleeping &&	cd /root/.go/src/github.com/whyrusleeping && git clone https://github.com/whyrusleeping/iptb.git 

#RUN	cd $GOPATH/src/github.com/whyrusleeping/iptb &&\
#	gx-go rw &&\
#	go build &&\
#	gx install &&\
#	go install

