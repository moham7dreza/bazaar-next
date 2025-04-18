#!make

.DEFAULT_GOAL := help

# Colors
COLOR_RESET = \033[0m
COLOR_GREEN = \033[32m
COLOR_BLUE = \033[34m
COLOR_CYAN = \033[36m
COLOR_YELLOW = \033[33m

## Project Management
help: ## Show this help menu
	@printf "${COLOR_CYAN}Usage:${COLOR_RESET}\n  make [command]\n\n${COLOR_CYAN}Available commands:${COLOR_RESET}\n"
	@awk -F ':.*##' '/^[a-zA-Z0-9_%-]+:.*##/ {printf "  ${COLOR_GREEN}%-25s${COLOR_RESET}%s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

## Linux
fix-permissions: ## Fix project directory permissions
	@printf "${COLOR_BLUE}▶ Fixing file and directory permissions...${COLOR_RESET}\n"
	@sudo chown -R $(USER):www-data .
	@sudo find . -type f -exec chmod 664 {} \;
	@sudo find . -type d -exec chmod 775 {} \;
	@printf "${COLOR_GREEN}✓ All permissions fixed successfully!${COLOR_RESET}\n"

## Development
install: ## Initialize project
	make fix-permissions
	sudo cp .env.example .env
	make dev

dev: ## Full development setup
	make reload
	next dev --turbopack

reload: ## Update and refresh application
	@echo "${COLOR_BLUE}▶ Updating and refreshing application...${COLOR_RESET}"
	git pull
	npm install
	next info
	next lint
	@echo "${COLOR_GREEN}✓ Application reloaded successfully!${COLOR_RESET}"