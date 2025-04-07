# Frontend - User Authentication App

This project is a React-based frontend application with TypeScript that implements a user authentication interface according to the provided Figma design.

## Tech Stack

- **React**: JavaScript library for building user interfaces
- **TypeScript**: Static type-checking for JavaScript
- **React Hook Form**: Form validation and handling
- **Zod**: Schema validation library
- **React Query**: Data fetching, caching, and state management
- **CSS Framework**:Tailwind.css

## Project Structure

```
src/
├── components/           # UI Components
│   ├── Button/
│   ├── Input/
|
├── hooks/             # API handling
│   └── useAuth.ts
├── types/                # TypeScript interfaces and types
│   └── index.ts
├── pages/                # Page components
│   ├── Login.tsx
│   └── Register.tsx
├── index.css
├── App.tsx
└── main.tsx

```

## Setup Instructions

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd <project-directory>/frontend
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
   VITE_API_URL=http://localhost:3001/api
   ```

## Running the Project Locally

1. Start the development server
   ```bash
   npm run dev
   # or
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Features

- **User Authentication**: Login interface with form validation
- **Type Safety**: Full TypeScript integration
- **Responsive Design**: Implementation follows the Figma design
- **Error Handling**: User-friendly error messages
- **Form Validation**: Field validation using React Hook Form and Zod

## Implementation Details

### UI Components

The UI components are built according to the Figma design, focusing on reusability and modularity. Each component has its own directory with:
- Component file (TSX)
- Styling file (CSS/SCSS)
- Tests (optional)

### Business Logic

Business logic is separated from UI components using:
- Custom hooks for reusable logic

### API Handling

API interactions are managed through:
- Centralized API service
- React Query for data fetching, caching, and state management
- Type-safe API responses

### Form Handling

- Forms implemented using React Hook Form
- Validation schemas defined with Zod
- Client-side validation before API requests
