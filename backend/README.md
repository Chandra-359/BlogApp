## Backend Details

### Features

1. API Endpoints:
    1. POST /api/generate: Generates a blog post using OpenAI GPT based on a prompt.
    2. GET /api/posts: Retrieves all blog posts stored in the database.
    3. DELETE /api/posts/:id: Deletes a specific blog post by ID.
2. LLM Integration: Uses OpenAI API for content generation.
3. Data Persistence: Stores generated blog posts in MongoDB.


## Installation

1. Navigate into the "backend" directory
    ```bash
    cd backend
    ```
2. Install dependencies
    ```bash
    bun install
    ```
## Running the Backend

1. Start the backend server
    ```bash
    bun start
    ```
