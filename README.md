# Online Video Downloader

This project is a web application that allows users to download videos from various supported websites. It consists of two main components: a server and a client. The server handles video data fetching, while the client provides a user interface for users to download videos by accessing the server.

## Features

- Download videos from supported platforms via youtube-dl.
- Clean and interactive UI for searching and downloading.
- Fetch and display download links using a server-client architecture.

## Project Structure

├── client # Frontend (Vite + React) 
└── server # Backend (Express)


### Client (Vite + React)

The client folder contains the frontend of the application, built with Vite and React. The client app allows users to enter video URLs and view available download options retrieved from the server.

#### Key Libraries Used

- **React** - For building the UI components.
- **Vite** - For fast frontend tooling.

### Server (Express)

The server folder contains the backend API built with Express. It serves as the main data source for the client, processing video download requests and interacting with `youtube-dl-exec` to provide download links.

#### Key Libraries Used

- **Express** - For handling API requests.
- **youtube-dl-exec** - For retrieving download links and video details.

## Installation

To run this project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/online-video-downloader.git
cd online-video-downloader
```

### 2. Install Dependencies
#### Server

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

#### Client 
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

### 3. Set Up Environment Variables

In the server folder, create a .env file with any necessary configuration (if applicable).

### 4. Run the Application
#### Server

In the server directory, start the Express server:
```bash
npm run start
```

This will start the server on http://localhost:3000 by default.
#### Client

In the client directory, start the Vite development server:
```bash
npm run dev
```

The client will start on http://localhost:5173 by default.
### 5. Usage

    Open the client URL (http://localhost:5173) in a browser.
    Enter a valid video URL.
    Available download links will be displayed based on the provided URL.

## API Endpoints
### /api/download

- Method: POST
- Description: Fetches download data for a specified video URL.
- Request Body: { url: string }
- Response: Returns download links and video details based on the URL.

```bash
POST http://localhost:3000/api/download
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=example"
}
```

Example Response
```json
{
  "title": "Example Video",
  "formats": [
    {
      "format": "720p",
      "url": "download-link-1"
    },
    {
      "format": "480p",
      "url": "download-link-2"
    }
  ]
}
```

## Technologies Used

- Client: Vite, React
- Server: Express
- Download Module: youtube-dl-exec