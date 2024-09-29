.PHONY: all setup build test deploy clean

# Default target
all: build

setup:
	@echo "Setting up CDK..."
	npm install

# Build target
build:
	@echo "Building CDK..."
	npm run build

# Test target
test:
	@echo "Testing CDK..."
	npm run test

# Deploy target
deploy:
	@echo "Deploying CDK..."
	npm run deploy

# Clean target
clean:
	@echo "Cleaning CDK build artifacts..."
	rm -rf dist
