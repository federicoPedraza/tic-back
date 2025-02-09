# The English Crab Page REST API

This project is the REST API for the English Crab page, built with [NestJS](https://nestjs.com/).

## Requirements

- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/)

## Installation

### 1. Install pnpm

If you don't have pnpm installed globally, run:

```bash
npm install -g pnpm
```

### 2. Install Dependencies

Install the project dependencies with:

```bash
pnpm install
```

### 3. Set Up the Database with Docker

To start the database container, use:

```bash
docker-compose -f docker-compose.yml up --build
```

To stop and remove the database container, run:

```bash
docker-compose -f docker-compose.yml down
```

## Development

For development, make sure your local database is running (using the Docker commands above), then start the development server:

```bash
pnpm run start:dev
```

## Additional Information

- This API is built with [NestJS](https://nestjs.com/). For further details, refer to the [NestJS documentation](https://docs.nestjs.com/).
- Ensure that Docker is running on your system before attempting to set up the database.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
