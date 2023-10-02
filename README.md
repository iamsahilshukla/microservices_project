# Microservices Documentation

## Content Service

### Overview

The Content Service is responsible for managing and serving books as content. It includes CRUD operations for content, data ingestion via CSV, and sorting options for new and top contents based on date and user interactions.

### Database Schema/Design

- **Content**
  - `_id`: Unique identifier for the content
  - `title`: Title of the content (e.g., book title)
  - `story`: Content story or description
  - `datePublished`: Date when the content was published
  - `userId`: Identifier of the user who created the content

### High-Level Design (HLD)

The Content Service follows a microservices architecture, using Node.js and MongoDB. It exposes REST APIs for managing content.

### Low-Level Design (LLD)

#### REST APIs

1. **Create Content** - `POST /api/content`
   - Create new content.
   - Request Body:
     - `title`: Title of the content
     - `story`: Content story or description

2. **Read Content** - `GET /api/content`
   - Retrieve all content.

3. **Read New Contents** - `GET /api/content/new`
   - Retrieve new contents sorted by date.

4. **Read Top Contents** - `GET /api/content/top`
   - Retrieve top contents sorted by user interactions (likes and reads).

5. **Read Content by ID** - `GET /api/content/:id`
   - Retrieve content by its unique ID.

6. **Update Content** - `PUT /api/content/:id`
   - Update content by its unique ID.

7. **Delete Content** - `DELETE /api/content/:id`
   - Delete content by its unique ID.

### API Documentation

For detailed API documentation, refer to the Swagger documentation for the Content Service.

## User Interaction Service

### Overview

The User Interaction Service records user events, including Likes and Reads, associated with content. It also provides APIs to validate user existence and expose internal APIs for the Content Service to sort top contents based on user interactions.

### Database Schema/Design

- **UserInteraction**
  - `_id`: Unique identifier for the interaction
  - `userId`: Identifier of the user who interacted
  - `contentId`: Identifier of the content being interacted with
  - `interactionType`: Type of interaction (Like or Read)
  - `createdAt`: Timestamp when the interaction was recorded

### High-Level Design (HLD)

The User Interaction Service is a microservice implemented using Node.js and MongoDB. It follows RESTful principles for APIs.

### Low-Level Design (LLD)

#### REST APIs

1. **Record User Interaction** - `POST /api/user-interaction`
   - Record user interactions, including Likes and Reads.
   - Request Body:
     - `userId`: Identifier of the user
     - `contentId`: Identifier of the content
     - `interactionType`: Type of interaction (Like or Read)

2. **Update User Interaction** - `PATCH /api/user-interaction/:id`
   - Update a user interaction by its unique ID.

3. **Read User Interaction** - `GET /api/user-interaction/:id`
   - Retrieve a user interaction by its unique ID.

4. **Read User Interactions** - `GET /api/user-interaction`
   - Retrieve all user interactions.

5. **Read User Interactions by Content** - `GET /api/user-interaction/content/:contentId`
   - Retrieve user interactions related to a specific content item.

### API Documentation

For detailed API documentation, refer to the Swagger documentation for the User Interaction Service.

## User Service

### Overview

The User Service manages user entities and provides CRUD operations for user data, including first name, last name, email, and phone number.

### Database Schema/Design

- **User**
  - `_id`: Unique identifier for the user
  - `firstName`: User's first name
  - `lastName`: User's last name
  - `email`: User's email address
  - `phoneNumber`: User's phone number

### High-Level Design (HLD)

The User Service is implemented as a microservice using Node.js and MongoDB, following RESTful conventions for APIs.

### Low-Level Design (LLD)

#### REST APIs

1. **Create User** - `POST /api/user`
   - Create a new user.
   - Request Body:
     - `firstName`: User's first name
     - `lastName`: User's last name
     - `email`: User's email address
     - `phoneNumber`: User's phone number

2. **Read User** - `GET /api/user/:id`
   - Retrieve a user by their unique ID.

3. **Update User** - `PUT /api/user/:id`
   - Update a user by their unique ID.

4. **Delete User** - `DELETE /api/user/:id`
   - Delete a user by their unique ID.

### API Documentation

For detailed API documentation, refer to the Swagger documentation for the User Service.

## Architecture Diagram

![Microservices Architecture Diagram](your-architecture-diagram-url)

This architecture diagram illustrates the interactions between the Content, User Interaction, and User services, as well as their connections to the respective databases.

This documentation provides an overview of the three microservices, their database schemas, API designs, and architecture. You can use Swagger or other documentation tools to generate more detailed API documentation.

Please replace placeholders (e.g., `your-service-url`, `your-architecture-diagram-url`) with actual URLs and paths relevant to your project.