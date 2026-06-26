# Rabiu Abubakar Salihawa - Professional Portfolio

A premium, dynamic portfolio web application built with **React**, **Vite**, **TypeScript**, and **TailwindCSS v4**, showcasing credentials and projects at the intersection of Marine Engineering, Data Analytics, and Artificial Intelligence.

## 🚀 Live Demo
The site is configured for instant deployment to Vercel/Netlify.

---

## 🛠️ Tech Stack
*   **Frontend**: React (v19), TypeScript
*   **Styling**: TailwindCSS (v4)
*   **Icons**: Lucide React
*   **Build Tool**: Vite (configured with `vite-plugin-singlefile` to compile the entire project into a single self-contained HTML file).

---

## ✨ Features
1.  **Dynamic Portfolio Sections**:
    *   **Hero**: Introduction and abstract mechatronics/network visualizer.
    *   **Stats Grid**: Quick counters highlighting academic years, certifications, and projects.
    *   **Selected Work**: A modular projects viewer showcasing mechatronics, AI tools, and data dashboards.
    *   **Skills & Expertise**: Dual column for technical skills (animated progress bars) and soft skills (interactive tag cards).
    *   **Professional Experience**: Career timeline showing roles at Centurion University and Baze University.
    *   **Education**: Educational milestones from CUTM India (B.Tech Mechanical/Marine) and Baze University (Professional Diploma in AI).
    *   **Certifications**: Modular grid displaying 28 specialized credentials from IBM, Google, Microsoft, and HP.
    *   **Insights (Blog)**: Technical blog layout with category filters.
2.  **Fully Functional Admin Dashboard**:
    *   Secured behind an admin login form (password: `salnera2024`).
    *   Provides full CRUD capabilities (Add, Edit, and Delete projects and experiences) with immediate data persistence saved to `localStorage`.
    *   Includes settings for future payment integrations (Paystack, Flutterwave, Stripe).

---

## 💻 Getting Started Locally

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/abubakar-r-salihawa/salnera-portfolio.git
    cd salnera-portfolio
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build
To compile the site into a single self-contained `index.html` file:
```bash
npm run build
```
The output file will be saved in the `dist/` directory.
