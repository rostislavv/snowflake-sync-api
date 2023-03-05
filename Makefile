# Makefile

start-dev:
	docker compose --profile deps up -d && npm run start:dev

build:
	docker build --network=host .

start:
	docker compose --profile all up
