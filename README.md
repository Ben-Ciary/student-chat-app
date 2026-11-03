# Student Chat App

## 1. Project Description

Student Chat App is a real-time messaging application developed using React and Firebase. It allows registered students to communicate through private one-to-one conversations.

## 2. Technologies Used

- React
- Vite
- JavaScript (JSX)
- Firebase Authentication
- Cloud Firestore
- CSS
- React Router

## 3. Main Features

- Student registration and login.
- Secure authentication using Firebase.
- Student profiles stored in Firestore.
- Real-time student directory.
- Search for students.
- One-to-one messaging.
- Real-time message delivery.
- Message history stored in Firestore.
- Sign-out functionality.
- Protected chat routes.
- Responsive user interface.

## 4. Project Structure

src/
├── components/
├── context/
├── firebase/
├── hooks/
├── pages/
├── services/
├── App.jsx
├── App.css
└── index.css

## 5. Installation and Setup

1. Clone or download the project.
2. Open the project folder.
3. Install dependencies using `npm install`.
4. Create a `.env` file in the project root.
5. Add your Firebase configuration using `.env.example` as a guide.
6. Run the application using `npm run dev`.
7. Open the local URL provided by Vite in your browser.

## 6. Firebase Configuration

The application uses Firebase Authentication for student accounts and Cloud Firestore for storing student profiles, conversations, and messages.

Firebase configuration values are stored in environment variables and should not be committed to version control.

## 7. Running the Application

Run `npm run dev` in the project terminal. Open the local address provided by Vite in your browser.
