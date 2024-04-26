## Event Management Platform

A web application for managing events organized by company, enabling users to browse upcoming events, book tickets, and manage their bookings, while administrators have access to an admin dashboard for event management.

### Documentation

#### users

- `/`: Home Page
- `/events`: get All upcoming events
- `/signin`: Login
- `/signup`: Create new Account

#### Authorized user

- `/tickets`: Get all ticket he/she has booked

#### Admin

- `/dashboard`: reach to dashboard
- `/dashboard/events`: reach to all events
- `/dashboard/booking`: reach to all booking

### Getting Started

1. Clone the frontend repository: `git clone` [event-platform-fn](https://github.com/AbdulKhaliq59/event-platform-fn)
2. clone the backend repository: `git clone` [event-platform-api](https://github.com/AbdulKhaliq59/event-platform-pi)
3. Navigate to the frontend directory: `cd event-platform-fn`
4. Install dependencies: `npm install`
5. Navigate to the backend directory `cd event-platform-pi`
6. Install dependencies: `npm install`
7. Set up environment variable: Create `.env` file add variable referred to the `.env.example`
8. Configure `MONGO DB` locally or remotely
9. Configure `Cloudinary`

### Run The Service

- #### Frontend

1. Open terminal
1. Run the frontend: `npm run start`
1. Open `http://localhost:5173/`

- #### Backend

1. Open terminal
2. Run the backend server: `npm run dev`
3. test `http://localhost:4040`

## Testing

- Open your browser
- Open this link [event-MP](https://event-mp.netlify.app/)

### Dependencies

- React.js
- Tailwind
- @hapi/joi
- axios
- dotenv
- jsonwebtoken
- jwt-decode
- process
- react
- react-dom
- react-icons
- react-router-dom
- react-select
- react-toastify

#### CREDENTIALS

##### Admin

- email: `admin@example.com`
- password: `password@12345`
