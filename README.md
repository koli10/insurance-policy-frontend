# Insurance Policy Management System - Frontend

This is the React frontend for the Insurance Policy Management System. It provides a user-friendly interface to manage insurance policies, allowing users to perform CRUD (Create, Read, Update, Delete) operations.

## 🚀 Tech Stack
- **Frontend:** React (JavaScript)

- **State Management:** React Hooks
- **API Communication:** Fetch API

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/koli10/insurance-policy-frontend.git
cd insurance-policy-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the React App
```bash
npm start
```
The application will run on:
**http://localhost:3000/**

## 🔥 Features
- Dashboard to display all policies
- Form to add new policies
- Edit and delete existing policies
- Search and filter policies
- Responsive dark green theme

## 🌍 API Endpoints (Connected to Backend)
| Method | Endpoint           | Description         |
|--------|-------------------|---------------------|
| GET    | `/policies`       | Get all policies   |
| POST   | `/policies`       | Add a new policy   |
| GET    | `/policies/<id>`  | Get a specific policy |
| PUT    | `/policies/<id>`  | Update a policy    |
| DELETE | `/policies/<id>`  | Delete a policy    |

## 🛠 Troubleshooting

### 1. "Module Not Found" Error?
```bash
npm install
```

### 2. React App Not Running?
```bash
npm start
```

### 3. Backend API Not Connecting?
- Ensure your backend is running at **http://127.0.0.1:5000/**.
- Check your API endpoints in **fetch()** calls.

## 📜 License
This project is open-source under the MIT License.

