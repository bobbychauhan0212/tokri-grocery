# Tokri backend

Express + MongoDB (Mongoose) API for the Tokri grocery store.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the environment file and fill in your values:
   ```
   cp .env.example .env
   ```
   - `MONGO_URI` — either a local MongoDB (`mongodb://127.0.0.1:27017/tokri`) or a
     MongoDB Atlas connection string.
   - `JWT_SECRET` — any long random string.

3. Load the 52 grocery products into your database:
   ```
   npm run seed
   ```

4. Start the server:
   ```
   npm run dev
   ```
   The API runs on `http://localhost:5000` by default.

## Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | – | Create an account |
| POST | /api/auth/login | – | Log in, returns a JWT |
| GET | /api/auth/me | ✓ | Current user |
| GET | /api/products | – | List products (`?category=`, `?search=`) |
| GET | /api/products/:id | – | Single product |
| GET | /api/cart | ✓ | Get your basket |
| POST | /api/cart | ✓ | Add item `{ productId, qty }` |
| PATCH | /api/cart/:productId | ✓ | Update quantity `{ qty }` |
| DELETE | /api/cart/:productId | ✓ | Remove item |
| GET | /api/wishlist | ✓ | Get your wishlist |
| POST | /api/wishlist/toggle | ✓ | Toggle item `{ productId }` |
| GET | /api/orders | ✓ | Your order history |
| POST | /api/orders | ✓ | Place an order from your current basket |

Send the JWT from login/register as `Authorization: Bearer <token>` on protected routes.
