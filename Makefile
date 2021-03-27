docker-build:
	docker build -t leandrorondon/udacity-fullstack-aws .
 
docker-run-c2-basic:
	docker run -it --rm -p 8082:8082 -v $(shell pwd)/course-02/exercises/udacity-c2-basic-server:/usr/src/app leandrorondon/udacity-fullstack-aws /bin/sh

docker-run-c2-restapi:
	docker run -it --rm -p 8080:8080 -v $(shell pwd)/course-02/exercises/udacity-c2-restapi:/usr/src/app leandrorondon/udacity-fullstack-aws npm run dev

docker-run-c2-frontend:
	docker run -it --rm -p 8100:8100 -v $(shell pwd)/course-02/exercises/udacity-c2-frontend:/usr/src/app leandrorondon/udacity-fullstack-aws ionic serve --external