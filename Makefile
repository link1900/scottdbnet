.PHONY: all build test deploy clean

# Default target
all: build

# Setup targets
setup:
	$(MAKE) -C client setup
	$(MAKE) -C server setup
	$(MAKE) -C cdk setup

# Build targets
build:
	$(MAKE) -C client
	$(MAKE) -C server
	$(MAKE) -C cdk

# Test targets
test:
	$(MAKE) -C client test
	$(MAKE) -C server test
	$(MAKE) -C cdk test

# Deploy targets
deploy:
	$(MAKE) -C cdk deploy

# Clean target
clean:
	$(MAKE) -C client clean
	$(MAKE) -C server clean
	$(MAKE) -C cdk clean
