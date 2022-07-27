

all: crp-test.html

%.html : %.pug
	pug3 --pretty $<