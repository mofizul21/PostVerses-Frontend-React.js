# PostVerses - Blog Application
PostVerses is a full-stack blog application designed to provide a feature-rich blogging experience. The frontend is built using React.js and leverages Vite for faster development and performance. The application comes with essential features like user authentication, CRUD operations for posts, user ownership permissions, and a customizable user profile.

## Screenshots


## Features
- **User Authentication:** Users can register, log in, and manage their profiles securely.

- **Post Management:** Users can create, read, update, and delete their blog posts.

- **User Permissions:** Only the author of a post can edit or delete it.

- **User Profile:** Personalized profile page for managing user information.

- **Responsive Design:** Fully responsive design using Tailwind CSS.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS

- **Backend:** Laravel, MySQL

- **State Management:** Context API

## Clone the Repository
`git clone https://github.com/mofizul21/PostVerses-Frontend-React.js`
`cd PostVerses-Frontend-React.js`

## Setup
### Install Dependencies:
`npm install`
### Start the Development Server:
`npm run dev`

## Project Structure
frontend/
┣ node_modules/
┣ public/
┃ ┣ author.png
┃ ┣ fallback.jpg
┃ ┣ favicon.svg
┃ ┣ mofizul_blog.png
┃ ┗ writing.jpg
┣ src/
┃ ┣ Context/
┃ ┃ ┗ AppContext.jsx
┃ ┣ Pages/
┃ ┃ ┣ Auth/
┃ ┃ ┃ ┣ Login.jsx
┃ ┃ ┃ ┣ Profile.jsx
┃ ┃ ┃ ┗ Register.jsx
┃ ┃ ┣ Posts/
┃ ┃ ┃ ┣ Create.jsx
┃ ┃ ┃ ┣ Show.jsx
┃ ┃ ┃ ┗ Update.jsx
┃ ┃ ┣ About.jsx
┃ ┃ ┣ Contact.jsx
┃ ┃ ┣ Gallery.jsx
┃ ┃ ┣ Home.jsx
┃ ┃ ┗ Layout.jsx
┃ ┣ App.css
┃ ┣ App.jsx
┃ ┣ config.js
┃ ┗ main.jsx
┣ .gitignore
┣ eslint.config.js
┣ index.html
┣ package-lock.json
┣ package.json
┣ postcss.config.js
┣ README.md
┣ tailwind.config.js
┗ vite.config.js