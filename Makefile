# Makefile

start-dev:
	docker compose --profile deps up -d && npm run start:dev
