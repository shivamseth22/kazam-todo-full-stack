# 📝 Full Stack Todo Application

A robust full-stack Todo application built with a Node.js/Express.js backend and a Next.js/React frontend, featuring user authentication, protected routes, and CRUD operations for todos, with MongoDB as the database.

## 🚀 Features





User Authentication: Register and login with JWT-based authentication, secure password hashing with bcrypt, and token blacklisting on logout.



Protected Routes: Secure access to todo operations for authenticated users only.



Todo CRUD Operations: Create, read, update, and delete todos with a clean UI.



Responsive Frontend: Built with Next.js, Tailwind CSS, and Radix UI components for a modern, accessible interface.



Input Validation: Backend validation with express-validator and frontend form handling.



CORS Support: Enables seamless integration between backend and frontend.



Environment Variables: Managed with dotenv for secure configuration.

## 🛠 Tech Stack

### Backend





- Runtime: Node.js



- Framework: Express.js



- Database: MongoDB, Mongoose



- Authentication: JWT, bcrypt



- Validation: express-validator



- Utilities: dotenv, cookie-parser, cors

### Frontend





- Framework: Next.js 15.3.2, React 19



- State Management: TanStack Query (@tanstack/react-query)



- HTTP Client: Axios



- Styling: Tailwind CSS, Radix UI components, Lucide React icons



- Utilities: date-fns, class-variance-authority, clsx, tailwind-merge



- Dev Tools: TypeScript, ESLint, PostCSS, Autoprefixer

## 🔧 Installation & Setup

### Prerequisites





- Node.js (v18 or higher)



- MongoDB (local or cloud instance, e.g., MongoDB Atlas)



### Git

- Clone the Repository

- git clone https://github.com/your-username/your-repo-name.git
- cd your-repo-name

### Backend Setup





- Navigate to Backend Directory (if separate, e.g., /service):

- cd service



- Install Dependencies:

- npm install



- Set Up Environment Variables:





- Create a .env file in the backend root directory:

- MONGO_URI = add_your_mongodb_uri
- PORT = 3001
- JWT_SECRET=this is a secret



### Start the Backend Server:

- npm start





- The server will run on http://localhost:3001 (or the specified port).

### Frontend Setup





Navigate to Frontend Directory (if separate, e.g., /frontend):

- cd client



- Install Dependencies:

- npm install



- Set Up Environment Variables (if needed, e.g., for API base URL):





- Create a .env.local file in the frontend root directory:

- NEXT_PUBLIC_API_URL=your_backend_base_url



### Start the Frontend Development Server:

- npm run dev





- The frontend will run on http://localhost:3000.

## 📬 API Endpoints
#### User Routes
#### Register User

  - Endpoint: POST /users/register

  - Description: Registers a new user.

 Request Body:

json
{
  "email": "user@example.com",
  "password": "your-password"
}

Response:

json
{
  "data": {
    "_id": "user-id",
    "email": "user@example.com",
    "__v": 0
  },
  "message": "The user is signed up successfully"
}


#### Login User

- Endpoint: POST /users/login

- Description: Logs in a user.

Request Body:

json
{
  "email": "user@example.com",
  "password": "your-password"
}


Response:

json
{
  "data": {
    "_id": "user-id",
    "email": "user@example.com",
    "__v": 0
  },
  "token": "jwt-token",
  "message": "The user is logged in successfully"
}


#### Get User Profile

- Endpoint: GET /users/profile

- Description: Retrieves the profile of the logged-in user.

- Headers:

makefile
Authorization: Bearer jwt-token


Response:

json
{
  "message": "This is the user profile",
  "data": {
    "_id": "user-id",
    "email": "user@example.com",
    "__v": 0
  }
}

#### Logout User

- Endpoint: POST /users/logout

- Description: Logs out the user and blacklists the token.

Headers:

Response:

json
{
  "message": "User logged out successfully"
}


### Todo Routes

#### Create Todo

- Endpoint: POST /todo/create

- Description: Creates a new todo item.

Request Body:

json
{
  "title": "Sample Todo",
  "description": "This is a sample todo item.",
  "status": "pending"
}


Response:

json
{
  "message": "Todo created successfully",
  "todo": {
    "_id": "todo-id",
    "title": "Sample Todo",
    "description": "This is a sample todo item.",
    "status": "pending",
    "user": "user-id",
    "__v": 0
  }
}


#### Get All Todos

- Endpoint: GET /todo/all

- Description: Retrieves all todos for the logged-in user.

Response:

json
{
  "message": "Fetched todos",
  "todos": [
    {
      "_id": "todo-id",
      "title": "Sample Todo",
      "description": "This is a sample todo item.",
      "status": "pending",
      "user": "user-id",
      "__v": 0
    }
    // ...other todos
  ]
}


#### Update Todo

- Endpoint: PUT /todo/:id

- Description: Updates a specific todo item.

Request Body:

json
{
  "title": "Updated Todo",
  "description": "This is an updated description.",
  "status": "completed"
}

Response:

json
{
  "message": "Todo updated",
  "todo": {
    "_id": "todo-id",
    "title": "Updated Todo",
    "description": "This is an updated description.",
    "status": "completed",
    "user": "user-id",
    "__v": 0
  }
}


#### Delete Todo

- Endpoint: DELETE /todo/:id

- Description: Deletes a specific todo item.

Response:

json
{
  "message": "Todo deleted"
}


#### 🧪 Validation and Error Handling
- Input Validation: Implemented using express-validator to ensure valid email formats and password lengths.

- Error Responses: Consistent error responses with appropriate HTTP status codes and descriptive messages.

#### 🔐 Authentication Middleware
- Token Verification: JWT tokens are verified for authenticity and expiration.

- Token Blacklisting: Upon logout, tokens are blacklisted to prevent reuse.

- Protected Routes: Middleware ensures that only authenticated users can access certain routes.