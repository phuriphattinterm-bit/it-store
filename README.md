# 💻 IT Store Frontend

The user interface for the IT Store application, built with React, Vite, and TypeScript. This application serves as the client-facing storefront, allowing users to browse the IT hardware and electronics catalog by communicating with the NestJS backend API.

## 📦 Tech Stack

* **Build Tool:** Vite (v7)
* **Library:** React (v19)
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Routing:** React Router DOM (v7)
* **Styling:** Tailwind CSS (v4)
* **Icons:** Lucide React
* **HTTP Client:** Axios (for connecting to the NestJS API)

## 🚀 Getting Started

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd it-store-ui
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   Create a `.env` file in the root directory and add the URL pointing to your local NestJS API:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application

To start the Vite development server locally:
```bash
npm run dev
```

Once started, open the local URL printed in your terminal (usually **`http://localhost:5173`**) in your browser to view the application.
