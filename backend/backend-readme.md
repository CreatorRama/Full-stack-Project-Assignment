# Backend - User Authentication API

This project is a Node.js  server using TypeScript and Prisma for database management, providing API endpoints for user authentication.

## Tech Stack

- **Node.js**: JavaScript runtime
- **TypeScript**: Static type-checking for JavaScript
- **Express.js**: Web framework for Node.js
- **Prisma**: ORM for database access
- **MySQL**: Database (based on implementation choice)
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing

## Project Structure

```
src/
├── controllers/          # Business logic for endpoints
│   └── authController.ts
├── routes/               # API route definitions
│   └── authRoutes.ts
├── middlewares/           # Express middleware
│   └── errorHandler.ts
├── utils/                # Utility functions
│   ├── passwordUtils.ts
├── types/                # TypeScript interfaces and types
│   └── index.ts
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations/            # Server entry point
└── app.ts                # Express application setup
```

## Prisma Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn package manager
- MYSQL/SQlite/Postrgres database (based on implementation choice)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd <project-directory>/backend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables
   - Create a `.env` file in the root directory
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   # or for SQLite or Mysql
   DATABASE_URL="file:./dev.db"
   
   PORT=your_port_number
   JWT_SECRET=""your_jwt_secret_key"
   NODE_ENV=your_node_environment ex=("DEvelopment","production","testing")
    FRONTEND_URL="your_frontend_url"
   ```

4. Set up the database
   ```bash
   npx prisma generate
   npx prisma migrate dev 
   # This will:
   # - Create the database if it doesn't exist
   # - Apply migrations
   # - Generate Prisma Client
   ```

## Running the Project

### Development Mode

To run the project in development mode with hot-reloading:
```bash
npm run dev
```

This will start the server using nodemon, which automatically restarts when file changes are detected.

### Production Build

To build the project for production:
```bash
npm run build
```

This will compile TypeScript files to JavaScript in the `dist` directory.

### Production Mode

To run the compiled project:
```bash
npm start
```

## Scripts

- `npm run dev` - Run the project in development mode
- `npm run build` - Build the project for production
- `npm start` - Run the compiled project


## API Endpoints
 The API will be available at `http://localhost:3001/api`

### Authentication

- **POST /api/auth/register**
  - Register a new user
  - Body: `{ email: string, password: string }`
  - Response: `{ id: string, email: string, token: string }`

- **POST /api/auth/login**
  - Login user
  - Body: `{ email: string, password: string }`
  - Response: `{ id: string, email: string, token: string }`

## Implementation Details

### Controllers

Controllers contain business logic for each endpoint, handling:
- Request validation
- Database operations through Prisma
- Response formatting
- Error handling

### Routes

Routes define API endpoints and connect them to the appropriate controllers.

### Error Handling

The application includes robust error handling through:
- Custom error middleware
- Consistent error response format

### Security Features

- Password hashing using bcrypt
- JWT for authentication
- Input validation and sanitization

### Database Access

Database operations are handled through Prisma Client, ensuring:
- Type-safe database queries
- Efficient data fetching
- Transaction support when needed
