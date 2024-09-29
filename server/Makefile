.PHONY: all setup build test package clean

# Default target
all: build

setup:
	@echo "Setting up server..."
	npm install

# Build target
build:
	@echo "Building server..."
	npm run build

# Test target
test:
	@echo "Testing server..."
	npm run test

# Package target
package:
	@echo "Packaging server..."
	./scripts/package.sh

# Clean target
clean:
	@echo "Cleaning server build artifacts..."
	rm -rf dist
	rm -rf artifact
	rm -rf coverage
