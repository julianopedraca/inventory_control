# Default target
.PHONY: push install

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