# Default target
.PHONY: push

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
