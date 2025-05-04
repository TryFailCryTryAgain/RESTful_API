# U05 - RESTful API

This project is a RESTful API built using **Express**, **TypeScript**, and **MongoDB**. It provides endpoints for managing users, books, reviews, and orders. The API is designed to be scalable, modular, and easy to use. Below is a detailed guide on how to set up, run, and interact with the API.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Server](#running-the-server)
5. [API Endpoints](#api-endpoints)
   - [User Routes](#user-routes)
   - [Book Routes](#book-routes)
   - [Review Routes](#review-routes)
   - [Order Routes](#order-routes)
6. [cURL Commands](#curl-commands)
   - [Local Server](#local-server)
   - [Deployed Server](#deployed-server)
7. [License](#license)

---

## Technologies Used

- **Backend Framework**: Express
- **Programming Language**: TypeScript (can be converted to JavaScript)
- **Database**: MongoDB
  - Mongoose (ODM)
  - MongoDB Compass
  - MongoDB Atlas
- **Environment Management**: dotenv
- **Development Tools**:
  - Nodemon
  - ts-node
  - TypeScript
  - @types/express
  - @types/node

---

## Project Structure
~~~
src/
├── controllers/
│ ├── bookController.ts
│ ├── orderController.ts
│ ├── reviewController.ts
│ ├── userController.ts
├── models/
│ ├── bookModel.ts
│ ├── userModel.ts
│ ├── orderModel.ts
│ ├── reviewModel.ts
├── routes/
│ ├── bookRoutes.ts
│ ├── orderRoutes.ts
│ ├── reviewRoutes.ts
│ ├── userRoutes.ts
├── utils/
│ ├── db.ts
├── .env
├── package.json
├── server.ts
├── tsconfig.json
bookmockdata.json
usermockdata.json
~~~

---

## Setup and Installation

1. **Clone the Repository**:
   - bash
   git clone <repository-url>
   cd <project-folder>¨

2. **Install Dependencies:**
    npm install

3. **Set Up Environment Variables:**
    - Create a .env file in the root directory.
    - Add the following variables:
      MONGO_URI=<your-mongodb-connection-string>

4. **Run the Server:**
    - For development:
      - npm run dev
    - For production:
      - npm run build
      - npm start

## API Endpoints

### User Routes

- GET /user/ - Fetches all users.
- GET /user/first/:first_name - Fetches users by first name.
- GET /user/last/:last_name - Fetches users by last name.
- GET /user/id/:_id - Fetches a user by ID.
- POST /user/ - Creates a new user.
- PUT /user/:_id - updates a user by ID.
- DELETE /user/:_id - Deletes a user by ID.

### Book Routes

- GET /book/ - fetches all books
- GET /book/:title - Fetches a book by title.
- GET /book/:_id - Fetches a book by ID.
- POST /book/ - Creates a new book.
- PUT /book/:_id - Updates a book by ID.
- DELETE /book/:_id - Deletes a book by ID.

### Review Routes

- GET /review/ - Fetches all reviews.
- GET /review/:_id - fetches a review by ID.
- POST /review/ - Creates a new review.
- PUT /review/:_id - updates a review by ID.
- DELETE /review/:_id - deletes a review by ID.

### Order Routes

- GET /order/ - Fetches all orders.
- GET /order/:_id - Fetches an order by ID.
- POST /order/ - Creates a new order.
- PUT /order/:_id - Updates an order by ID.
- DELETE /order/:_id - Deletes an order by ID.

## cURL Commands

### Local Server

#### Fetch all users
~~~
  curl http://localhost:3000/user/
~~~

#### Fetch users by first name
~~~
  curl http://localhost:3000/user/first/:first_name
~~~

#### Fetch users by last name
~~~
  curl http://localhost:3000/user/last/:last_name
~~~

#### Fetch user by ID
~~~
  curl http://localhost:3000/user/id/:_id
~~~

#### Create a new user
~~~
  curl -X POST http://localhost:3000/user/ \
  -H "Content-Type: application/json" \
  -d '{"first_name": "John", "last_name": "Doe", "email": "John.Doe@example.se", "password": "Test123"}'
~~~

#### Update a user by ID
~~~
  curl -X PUT http://localhost:3000/user/:_id \
  -H "Content-Type: application/json" \
  -d '{"first_name": "John", "last_name": "Doe", "email": "John.Doe@example.se", "password": "Test123"}'
~~~
#### Delete a user by ID
~~~
  curl -X DELETE http://localhost:3000/user/:_id
~~~
#### Fetch all books
~~~
curl http://localhost:3000/book/
~~~
#### Fetch a book by title
~~~
  curl http://localhost:3000/book/:title
~~~
#### Fetch a book by ID
~~~
  curl http://localhost:3000/book/:_id
~~~
#### Create a new book
~~~
  curl -X POST http://localhost:3000/book/ \
  -H "Content-Type: application/json" \
  -d '{"title": "", "author": "", "genre": "", "price": "", "stock": "", "description": "", "publishedDate": ""}'
~~~
#### Update a book by ID
~~~
  curl -X PUT http://localhost:3000/book/:_id \
  -H "Content-Type: application/json" \
  -d '{"title": "", "author": "", "genre": "", "price": "", "stock": "", "description": "", "publishedDate": ""}'
~~~
#### Delete a book by ID
~~~
  curl -X DELETE http://localhost:3000/book/:_id
~~~
#### Fetch all reviews
~~~
  curl http://localhost:3000/review/
~~~
#### Fetch a review by ID
~~~
  curl http://localhost:3000/review/:_id
~~~
#### Create a new review
~~~
  curl -X POST http://localhost:3000/review/ \
  -H "Content-Type: application/json" \
  -d '{"bookId": "", "userId": "", "rating": "", "comment": ""}'
~~~
#### Update a review by ID
~~~
  curl -X PUT http://localhost:3000/review/:_id \
  -H "Content-Type: application/json" \
  -d '{"bookId": "", "userId": "", "rating": "", "comment": ""}'
~~~
#### Delete a review by ID
~~~
  curl -X DELETE http://localhost:3000/review/:_id
~~~
#### Fetch all orders
~~~
  curl http://localhost:3000/order/
~~~
#### Fetch an order by ID
~~~
  curl http://localhost:3000/order/:_id
~~~
#### Create a new order
~~~
  curl -X POST http://localhost:3000/order/ \
  -H "Content-Type: application/json" \
  -d '{"userId": "", "bookIds": ["", ""]}'
~~~
#### Update an order by ID
~~~
  curl -X PUT http://localhost:3000/order/:_id \
  -H "Content-Type: application/json" \
  -d '{"userId": "", "bookIds": ["", ""]}'
~~~
#### Delete an order by ID
~~~
  curl -X DELETE http://localhost:3000/order/:_id
~~~

### Deployed server

#### Fetch all users
~~~
  curl https://restful-api-sca9.onrender.com/user/
~~~

#### Fetch users by first name
~~~
  curl https://restful-api-sca9.onrender.com/user/first/:first_name
~~~

#### Fetch users by last name
~~~
  curl https://restful-api-sca9.onrender.com/user/last/:last_name
~~~

#### Fetch user by ID
~~~
  curl https://restful-api-sca9.onrender.com/user/id/:_id
~~~

#### Create a new user
~~~
  curl -X POST https://restful-api-sca9.onrender.com/user/ \
  -H "Content-Type: application/json" \
  -d '{"first_name": "John", "last_name": "Doe", "email": "John.Doe@example.se", "password": "Test123"}'
~~~

#### Update a user by ID
~~~
  curl -X PUT https://restful-api-sca9.onrender.com/user/:_id \
  -H "Content-Type: application/json" \
  -d '{"first_name": "John", "last_name": "Doe", "email": "John.Doe@example.se", "password": "Test123"}'
~~~
#### Delete a user by ID
~~~
  curl -X DELETE https://restful-api-sca9.onrender.com/user/:_id
~~~
#### Fetch all books
~~~
curl https://restful-api-sca9.onrender.com/book/
~~~
#### Fetch a book by title
~~~
  curl https://restful-api-sca9.onrender.com/book/:title
~~~
#### Fetch a book by ID
~~~
  curl https://restful-api-sca9.onrender.com/book/id/:_id
~~~
#### Create a new book
~~~
  curl -X POST https://restful-api-sca9.onrender.com/book/ \
  -H "Content-Type: application/json" \
  -d '{"title": "", "author": "", "genre": "", "price": "", "stock": "", "description": "", "publishedDate": ""}'
~~~
#### Update a book by ID
~~~
  curl -X PUT https://restful-api-sca9.onrender.com/book/:_id \
  -H "Content-Type: application/json" \
  -d '{"title": "", "author": "", "genre": "", "price": "", "stock": "", "description": "", "publishedDate": ""}'
~~~
#### Delete a book by ID
~~~
  curl -X DELETE https://restful-api-sca9.onrender.com/book/id/:_id
~~~
#### Fetch all reviews
~~~
  curl https://restful-api-sca9.onrender.com/review/
~~~
#### Fetch a review by ID
~~~
  curl https://restful-api-sca9.onrender.com/review/:_id
~~~
#### Create a new review
~~~
  curl -X POST https://restful-api-sca9.onrender.com/review/ \
  -H "Content-Type: application/json" \
  -d '{"bookId": "", "userId": "", "rating": "", "comment": ""}'
~~~
#### Update a review by ID
~~~
  curl -X PUT https://restful-api-sca9.onrender.com/review/:_id \
  -H "Content-Type: application/json" \
  -d '{"bookId": "", "userId": "", "rating": "", "comment": ""}'
~~~
#### Delete a review by ID
~~~
  curl -X DELETE https://restful-api-sca9.onrender.com/review/:_id
~~~
#### Fetch all orders
~~~
  curl https://restful-api-sca9.onrender.com/order/
~~~
#### Fetch an order by ID
~~~
  curl https://restful-api-sca9.onrender.com/order/:_id
~~~
#### Create a new order
~~~
  curl -X POST https://restful-api-sca9.onrender.com/order/ \
  -H "Content-Type: application/json" \
  -d '{"userId": "", "bookIds": ["", ""]}'
~~~
#### Update an order by ID
~~~
  curl -X PUT https://restful-api-sca9.onrender.com/order/:_id \
  -H "Content-Type: application/json" \
  -d '{"userId": "", "bookIds": ["", ""]}'
~~~
#### Delete an order by ID
~~~
  curl -X DELETE https://restful-api-sca9.onrender.com/order/:_id
~~~




## Licens
This project is licensed under the MIT License. See the LICENSE file for details