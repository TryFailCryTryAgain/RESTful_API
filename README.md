
## Package Json
**Start**: Runs the compiled JavaScript code
**Build**: Compiles Typescript to JavaScript.
**Dev**: run the development server with ts-node and nodemon.




// design the API

1. Object modeling (Identify the objects that will be preseted as resources)

2. Create resource uris (Decide the resource URI's that endpoints for the API)

3. Resource representations (Work on the resource representation that each URI will return to the clients)

4. Assign HTTP methods ( Decide all possible operations and map those to the resource URIs via HTTP Methods )


Theme: Online BookStore API

The main objects (resources) in this system are:

Book: Represents a book in the bookstore.

    Attributes: id, title, author, genre, price, stock, description, publishedDate.

User: Represents a user of the bookstore.

    Attributes: id, name, email, password, address, phone.

Order: Represents an order placed by a user.

    Attributes: id, userId, bookIds (list of book IDs), totalAmount, orderDate, status.

Review: Represents a review left by a user for a book.

    Attributes: id, bookId, userId, rating, comment, date.


Routes regarding the API:

- Regarding books

/books (Get all books in the db)

/books/{bookId} (get a specific book)

/books (add a new book)

/books{bookID} (update a specific book)

/books{bookID} (delete a specific book)

- Regarding users

/users (get all users)

/users/{userid} (get a specific user)

/users {register a new user}

/users/{userid} (update a user)

/users/{userid} (delete a user)

- Regarding orders

/order (get all order)

/order/{orderid} (get a specific order)

/order {register a new order}

/order/{orderid} (update a order)

/order/{orderid} (delete a order)

- Regarding Reviews

/books/{bookId}/reviews (Get all reviews for a book) 

/reviews/{reviewId} (Get a specific review) 

/books/{bookId}/reviews (Add a review) 

/reviews/{reviewId} (Update a review) 

/reviews/{reviewId} (Delete a review)


Resource Representation:

- Book
{
  "id": "123",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "price": 10.99,
  "stock": 50,
  "description": "A classic novel about the American Dream.",
  "publishedDate": "1925-04-10"
}

- User
{
  "id": "456",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "hashed_password",
  "address": "123 Main St, City, Country",
  "phone": "+1234567890"
}

- order
{
  "id": "789",
  "userId": "456",
  "bookIds": ["123", "124"],
  "totalAmount": 25.98,
  "orderDate": "2023-10-01T12:00:00Z",
  "status": "Shipped"
}

- review
{
  "id": "101",
  "bookId": "123",
  "userId": "456",
  "rating": 5,
  "comment": "Amazing book!",
  "date": "2023-10-02T14:30:00Z"
}

4. Assing HTTP methods

Books

GET /books: Retrieve all books.
GET /books/{bookId}: Retrieve a specific book.
POST /books: Add a new book.
PUT /books/{bookId}: Update a book.
DELETE /books/{bookId}: Delete a book.

Users

GET /users: Retrieve all users.
GET /users/{userId}: Retrieve a specific user.
POST /users: Register a new user.
PUT /users/{userId}: Update a user.
DELETE /users/{userId}: Delete a user.

Orders

GET /orders: Retrieve all orders.
GET /orders/{orderId}: Retrieve a specific order.
POST /orders: Place a new order.
PUT /orders/{orderId}: Update an order status.
DELETE /orders/{orderId}: Delete an order.

Reviews

GET /books/{bookId}/reviews: Retrieve all reviews for a book.
GET /reviews/{reviewId}: Retrieve a specific review.
POST /books/{bookId}/reviews: Add a review for a book.
PUT /reviews/{reviewId}: Update a review.
DELETE /reviews/{reviewId}: Delete a review.