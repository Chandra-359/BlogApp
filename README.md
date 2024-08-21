# Blog Post Generator

Welcome to the Blog Post Generator! This project is a simple full-stack web application that allows users to generate and manage blog posts using a Large Language Model (LLM) API, specifically OpenAI's GPT. The application is built using the MERN stack (MongoDB, Express, React, Node.js) and leverages Bun as the package manager.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Generate blog posts based on user-provided prompts using OpenAI's GPT API.
- View, edit, and delete generated blog posts.
- Clean, user-friendly interface with minimal styling.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API**: OpenAI GPT
- **Package Manager**: Bun

## Installation

### Prerequisites

1. Make sure you have [Bun](https://bun.sh/docs/installation) installed on your machine. If not, you can install it by running:

   For Mac
   ```bash
   brew install oven-sh/bun/bun
   ```
   For Windows
   ```bash
   powershell -c "irm bun.sh/install.ps1|iex"
   ```
2. Make sure you have [Node JS](https://nodejs.org/en/download/package-manager) install on you machine.

#### To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Chandra-359/BlogApp 
   cd BlogApp
   ```
2. Install dependencies for backend
   ```bash
   cd backend
   bun install
   ```
3. Install dependencies for frontend
   ```bash
   cd frontend
   bun install
   ```
4. Set up enviroment variables:
   
   Create a .env file in the root of the backend directory with the following content:
   ```bash
   OPENAI_API_KEY=your-openai-api-key
   DB_URL=your-mongodb-uri
   PORT=5000
   ```


## Running the Application

1. Start the backend server
   ```bash
   bun start
   ```
2. Start the frontend development server
   ```bash
   bun run dev
   ```
3. Open your browser and navigate to  http://localhost:5173/ to see the application in action

