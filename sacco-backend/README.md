# SACCO Backend Project

This project is a Node.js and Express.js backend application that provides functionality for users to join a SACCO (Savings and Credit Cooperative Organization) and make deposits into their SACCO accounts.

## Project Structure

```
sacco-backend
├── src
│   ├── controllers
│   │   ├── saccoController.js
│   ├── routes
│   │   ├── saccoRoutes.js
│   ├── models
│   │   ├── saccoModel.js
│   ├── app.js
│   └── config
│       └── db.js
├── package.json
├── .env
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd sacco-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add your database connection string:
   ```
   DATABASE_URL=<your-database-connection-string>
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. The server will run on `http://localhost:3000`.

## API Endpoints

- **Join a SACCO**
  - **Endpoint:** `POST /api/sacco/join`
  - **Description:** Allows a user to join a SACCO.
  - **Request Body:** 
    ```json
    {
      "userId": "<user-id>",
      "saccoId": "<sacco-id>"
    }
    ```

- **Make a Deposit**
  - **Endpoint:** `POST /api/sacco/deposit`
  - **Description:** Allows a user to make a deposit into their SACCO.
  - **Request Body:** 
    ```json
    {
      "userId": "<user-id>",
      "saccoId": "<sacco-id>",
      "amount": <deposit-amount>
    }
    ```

## License

This project is licensed under the MIT License.