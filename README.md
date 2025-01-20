# Travel Sphere

## Purpose

The Tourist Guide site is an online platform that serves as a comprehensive resource for travelers. It provides detailed information on popular destinations in Bangladesh, helping users plan their trips effectively. The site features in-depth descriptions of various tourist attractions, ensuring visitors know what to expect. Additionally, it offers insights into local culture, cuisine, and activities, enriching the travel experience. Whether you're looking for famous landmarks or hidden gems, The Tourist Guide site has everything you need to make the most of your visit to Bangladesh.

## Live URL

[(https://travel-sphere-bd.web.app/)]

## Key Features

### 1. **User Authentication with JWT**

- Secure user authentication using **JWT**.
- Protects user routes and sensitive information.
- Token-based authentication allows for stateless sessions, enhancing performance and scalability.

### 2. **Role-Based Access Control (RBAC)**

- Admin users can manage profiles, tours, and stories.
- Regular users can manage their bookings and profiles.
- **JWT** ensures that only authorized users have access to protected routes.

### 3. **Trip and Tour Management**

- Display various travel destinations in Bangladesh.
- Users can explore detailed information about each destination.
- Admins can add, update, or remove trips and tours from the platform.

### 4. **Bookings and Tour Management for Users**

- Users can book trips, view their booking history, and manage upcoming tours.
- Admins can view and manage all bookings.

### 5. **Story Sharing Platform**

- Users can share their travel stories with the community.
- Admins can manage user-generated content and moderate shared stories.

### 6. **JWT-Based Protected Routes**

- **Secure routes**: Protect routes like user profile, bookings, and others.
- **Authorization**: Role-based access control ensures that only authorized users can access certain features (e.g., admin routes).

### 7. **RESTful API Endpoints**

- Built using **Express** to serve data to the frontend and handle user interactions.
- Allows for scalable and efficient management of resources like users, bookings, and tours.

### 8. **Responsive Frontend**

- The frontend is designed to be responsive and user-friendly for all devices (desktop, tablet, and mobile).
- Interactive UI to enhance user experience when exploring tours and destinations.

### 9. **Integration with External Libraries**

- Integrated with **Vimeo** for video embedding related to each tour.
- Integration with **Helmet** for secure and SEO-friendly page titles.

## Setup

### Backend Setup

1. Repository: https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-mdekramulridoy

### Client Setup

1. Repository: https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-mdekramulridoy

## Main Technologies

This project utilizes the following technologies:

- **React**: For building a dynamic and responsive user interface.
- **React Router DOM**: For managing client-side routing.
- **Firebase**: For backend services and authentication.
- **TailwindCSS**: For styling the application.
- **DaisyUI**: For prebuilt UI components with TailwindCSS.
  more will be added soon..............

## Main Features

This project includes the following key features:

1. **Responsive Design**: Works seamlessly across devices like mobile, tablet, and desktop.
2. **Firebase Integration**: Provides authentication and real-time database services.
3. **Client-Side Routing**: Uses React Router for dynamic navigation without page reloads.
4. **Prebuilt UI Components**: DaisyUI enhances styling and speeds up development.
   more will be added soon.................

## Dependencies

Here are the primary dependencies used in this project:

- **firebase**: ^11.1.0
- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **react-router-dom**: ^7.1.0
  more will be added soon.....................

### Development Dependencies

- **@eslint/js**: ^9.17.0
- **@types/react**: ^18.3.17
- **@types/react-dom**: ^18.3.5
- **@vitejs/plugin-react**: ^4.3.4
- **autoprefixer**: ^10.4.20
- **daisyui**: ^4.12.22
- **eslint**: ^9.17.0
- **eslint-plugin-react**: ^7.37.2
- **eslint-plugin-react-hooks**: ^5.0.0
- **eslint-plugin-react-refresh**: ^0.4.16
- **globals**: ^15.13.0
- **postcss**: ^8.4.49
- **tailwindcss**: ^3.4.17
- **vite**: ^6.0.3

## Running the Project Locally

To run this project on your local machine, follow these steps:

### 1. Prerequisites

- Install [Node.js](https://nodejs.org/) on your system.
- Set up Firebase (if required).

### 2. Clone the Project

```bash
git clone [Your Project Repository URL]
cd [Project Folder Name]
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```
REACT_APP_FIREBASE_API_KEY=[Your Firebase API Key]
REACT_APP_FIREBASE_AUTH_DOMAIN=[Your Firebase Auth Domain]
REACT_APP_FIREBASE_PROJECT_ID=[Your Firebase Project ID]
REACT_APP_FIREBASE_STORAGE_BUCKET=[Your Firebase Storage Bucket]
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=[Your Firebase Messaging Sender ID]
REACT_APP_FIREBASE_APP_ID=[Your Firebase App ID]

it will be fix soon......................
```

### 5. Run the Project

```bash
npm run dev
```

### 6. Open in Browser

Once the development server is running, open your browser and go to:

```
https://travel-sphere-server-nu.vercel.app
```

## Contribution

To contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a meaningful message.
4. Push your branch and submit a Pull Request.
