#!/bin/bash

# TaskFlow Docker Management Script

set -e

PROJECT_NAME="taskflow"
COMPOSE_FILE="docker-compose.yml"
DEV_COMPOSE_FILE="docker-compose.dev.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
usage() {
    echo "TaskFlow Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build          Build all services"
    echo "  up             Start all services"
    echo "  down           Stop all services"
    echo "  dev            Start development environment"
    echo "  prod           Start production environment"
    echo "  logs           Show logs from all services"
    echo "  logs [service] Show logs from specific service"
    echo "  restart        Restart all services"
    echo "  clean          Remove all containers, volumes, and images"
    echo "  test           Run tests in container"
    echo "  shell [service] Open shell in service container"
    echo "  status         Show status of all services"
    echo ""
    echo "Services: mongodb, backend, frontend"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Function to build services
build() {
    print_status "Building services..."
    docker-compose -f $COMPOSE_FILE build
}

# Function to start services
up() {
    print_status "Starting services..."
    docker-compose -f $COMPOSE_FILE up -d
    print_status "Services started. Access your app at:"
    print_status "  Frontend: http://localhost"
    print_status "  Backend API: http://localhost:3000"
    print_status "  MongoDB: localhost:27017"
}

# Function to stop services
down() {
    print_status "Stopping services..."
    docker-compose -f $COMPOSE_FILE down
}

# Function to start development environment
dev() {
    print_status "Starting development environment..."
    docker-compose -f $DEV_COMPOSE_FILE up -d
    print_status "Development environment started. Access your app at:"
    print_status "  Frontend: http://localhost:5173"
    print_status "  Backend API: http://localhost:3000"
    print_status "  MongoDB: localhost:27017"
}

# Function to start production environment
prod() {
    print_status "Starting production environment..."
    docker-compose -f $COMPOSE_FILE up -d
    print_status "Production environment started. Access your app at:"
    print_status "  Frontend: http://localhost"
    print_status "  Backend API: http://localhost:3000"
}

# Function to show logs
logs() {
    if [ -n "$2" ]; then
        docker-compose -f $COMPOSE_FILE logs -f $2
    else
        docker-compose -f $COMPOSE_FILE logs -f
    fi
}

# Function to restart services
restart() {
    print_status "Restarting services..."
    docker-compose -f $COMPOSE_FILE restart
}

# Function to clean everything
clean() {
    print_warning "This will remove all containers, volumes, and images. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Cleaning up..."
        docker-compose -f $COMPOSE_FILE down -v --rmi all
        docker-compose -f $DEV_COMPOSE_FILE down -v --rmi all
        docker system prune -f
    else
        print_status "Clean cancelled."
    fi
}

# Function to run tests
test() {
    print_status "Running tests..."
    docker-compose -f $DEV_COMPOSE_FILE exec backend npm test
}

# Function to open shell in container
shell() {
    if [ -z "$2" ]; then
        print_error "Please specify a service name"
        echo "Available services: mongodb, backend, frontend"
        exit 1
    fi

    case $2 in
        mongodb)
            docker-compose -f $COMPOSE_FILE exec mongodb mongosh -u admin -p password123
            ;;
        backend)
            docker-compose -f $COMPOSE_FILE exec backend sh
            ;;
        frontend)
            docker-compose -f $COMPOSE_FILE exec frontend sh
            ;;
        *)
            print_error "Unknown service: $2"
            echo "Available services: mongodb, backend, frontend"
            exit 1
            ;;
    esac
}

# Function to show status
status() {
    print_status "Service Status:"
    docker-compose -f $COMPOSE_FILE ps
}

# Main script logic
check_docker

case $1 in
    build)
        build
        ;;
    up)
        up
        ;;
    down)
        down
        ;;
    dev)
        dev
        ;;
    prod)
        prod
        ;;
    logs)
        logs "$@"
        ;;
    restart)
        restart
        ;;
    clean)
        clean
        ;;
    test)
        test
        ;;
    shell)
        shell "$@"
        ;;
    status)
        status
        ;;
    *)
        usage
        exit 1
        ;;
esac