SERVICES=all

# Target to initialize the environment
init:
	@echo "Initializing the environment..."

install:
	bash install.sh

run-all:
	bash start.sh

run-frontend:
	cd services/frontend && pnpm dev

run-backend:
	cd services/backend && php artisan serve --port=8000 --host=0.0.0.0