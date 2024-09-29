.PHONY: all setup build test clean

# Default target
all: build

setup:
	@echo "Setting up client..."
	npm install

# Build target
build:
	@echo "Building client..."
	npm run build

# Test target
test:
	@echo "Testing client..."
	npm run test

# Clean target
clean:
	@echo "Cleaning client build artifacts..."
	rm -rf dist
