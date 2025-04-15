# Default target
.PHONY: push install test

# Push target that requires branch_name parameter
push:
	@if [ -z "$(branch_name)" ]; then \
		echo "Error: branch_name is required"; \
		echo "Usage: make push branch_name=<your-branch-name>"; \
		exit 1; \
	fi
	git checkout -b $(branch_name)
	git add .
	git commit -m "$(branch_name)"
	git push origin $(branch_name)

install:
	cp .env.example .env && \
	composer require tymon/jwt-auth && \
	php artisan key:generate && \
	php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" && \
	php artisan jwt:secret && \
	php artisan migrate && \
	php artisan db:seed && \
	npm install

test:
	./vendor/bin/pest

start:
	@echo "Starting Laravel and Vite dev servers... (Press Ctrl+C to stop)"
	@trap 'echo "\n✨ Servers stopped by user. Goodbye!"; exit 0' INT; \
	php artisan serve & \
	PHP_PID=$$!; \
	npm run dev & \
	NPM_PID=$$!; \
	wait $$PHP_PID $$NPM_PID

stop:
	@echo "Stopping Laravel and Vite servers..."
	@pkill -f "php artisan serve" || echo "Laravel server not running."
	@pkill -f "npm run dev" || echo "Vite server not running."
