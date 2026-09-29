# Simple CMS

A simple **Blog Content Management System** built with **Node.js, Express, EJS, and MongoDB**.

## Features

* View all blog posts
* Create new posts
* View individual posts
* Edit existing posts
* Automatic post creation date
* Server-side rendering with EJS
* Persistent MongoDB storage

## Tech Stack

**Node.js · Express.js · EJS · MongoDB · HTML · CSS**

## Project Structure

```text
cms-lab/
├── app.js
├── package.json
├── views/
│   ├── posts.ejs
│   ├── new-post.ejs
│   ├── post.ejs
│   └── edit-post.ejs
└── public/
    └── style.css
```

## How to Run

### 1. Start MongoDB

Make sure the local MongoDB server is running.

The application uses:

```text
mongodb://127.0.0.1:27017
```

Database:

```text
cms_lab
```

Collection:

```text
posts
```

### 2. Install dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 3. Start the application

For development with Nodemon:

```bash
npm run dev
```

Or run normally:

```bash
npm start
```

### 4. Open the application

Visit:

```text
http://localhost:3000
```

---

**Simple CMS — Server-Side Rendered Blog Management System**
