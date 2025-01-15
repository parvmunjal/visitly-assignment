# User Management App - Full Stack Application

User Management App is a full-stack web application built with a Spring Boot backend and a React frontend. The app enables users to register, log in, and perfrom CRUD opeartions, ensuring smooth and responsive interactions.
- **Live Application:** You can access the live application here: [User Management App](https://visitly-assignment.netlify.app)


## Tech Stack

- **Frontend:** React, React Bootstrap
- **Backend:** Spring Boot, MySQL
- **Deployment:**
  - Frontend: [Netlify](https://www.netlify.com/)
  - Backend: [Heroku](https://www.heroku.com/)

## Features

- **User Authentication & Authorization:**
  - Secure user registration and login using JWT (JSON Web Tokens).
  - Passwords are hashed with BCrypt for added security.
  - Session management for user authentication.

- **CRUD Operations:**
  - Users can create, read, update, and delete users in a seamless manner.

- **Responsive Design:**
  - The application is fully responsive, ensuring a great user experience on both desktop and mobile devices.
  - It adapts to different screen sizes and provides an optimal layout on all devices.

## Installation

### Backend (Spring Boot)

1. Clone the repository:
    ```bash
    git clone https://github.com/parvmunjal/visitly-assignment.git
    cd backend
    ```
2. Set up your MySQL database and update the connection settings in `src/main/resources/application.properties` with your local database credentials.
3. Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```
    This will start the backend server on `http://localhost:8080`.

### Frontend (React)

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```
3. Run the React application:
    ```bash
    npm start
    ```
    This will start the frontend on `http://localhost:3000`.

## API Documentation

The backend exposes a set of RESTful APIs for interaction with the frontend:

- **POST /auth/register** - Register a new user by providing necessary user details.
- **POST /auth/login** - Authenticate an existing user and retrieve a JWT token.
- **GET /users** - Fetch a list of all users in the system.
- **GET /users/{userId}** - Retrieve a specific user by ID.
- **PUT /users/{userId}** - Update an existing user's profile information.
- **DELETE /users/{userId}** - Delete a user from the system.

For more detailed API specifications, please refer to the backend codebase.

## Security

The application ensures secure interactions with the use of:

- **JWT Authentication:** Secure authentication using JSON Web Tokens for user login and session management.
- **BCrypt Password Hashing:** All user passwords are hashed using BCrypt before being stored in the database, ensuring password security.
- **Spring Security:** The backend is secured using Spring Security for robust protection against unauthorized access.

## Error Handling

The application provides detailed error handling to ensure smooth user experience:

- **Backend:** Graceful error responses are returned for failed API requests.
- **Frontend:** Proper error messages are displayed in the UI in case of failed actions or server errors.

## Deployment

- The **frontend** is deployed and hosted on [Netlify](https://visitly-frontend.netlify.app/).
- The **backend** is deployed and hosted on [Heroku](https://visitly-backend.herokuapp.com/).

## Testing

Integration and unit tests are implemented using JUnit and Mockito to verify the application's functionality. Tests cover user registration, login, and API responses, ensuring that all endpoints behave as expected.

## Contribution

We welcome contributions to this project! To contribute, please follow these steps:

1. Fork the repository to your own GitHub account.
2. Create a new branch for your feature (`git checkout -b feature-branch`).
3. Make the necessary changes and commit them (`git commit -am 'Add new feature'`).
4. Push the changes to your fork (`git push origin feature-branch`).
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License.
