# Frontend Task Manager App

This is a **Task Manager Frontend Application** built with modern web technologies such as **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and more. The app provides a clean and intuitive UI for managing tasks with features such as pagination, sorting, filtering, and dynamic task management.

---

## Features

- **Tasks Management**: 
  - View tasks in a paginated list with each task displayed as a card.
  - Each card contains:
    - **Title** and **Description**.
    - A toggle to mark the task as **Complete/Incomplete**.
    - The **Creation Date**.
    - A **Delete** button to remove the task.
  - **Edit Tasks**: Click on the **Title** or **Description** to edit them directly.
  - **Add Tasks**: Use the **Add Task** button to open a modal where you can create a new task.

- **Pagination**:
  - Navigate between pages of tasks.
  - **Dropdown** to set how many tasks are displayed per page.

- **Sorting**:
  - Sort tasks by **any field** (e.g., Title, Created At) in **Ascending** or **Descending** order.

- **Filtering**:
  - Filter tasks based on their completion status (**Complete** or **Incomplete**).

---

## Tech Stack

- **Vite**: Lightning-fast development server and build tool.
- **React**: For building the user interface.
- **TypeScript**: Type-safe JavaScript for better developer experience.
- **React Hook Form**: Simplified forms with validations.
- **React Query**: Efficient data fetching and caching.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn/ui**: UI component library for consistent design.
- **Zod**: Schema validation for task forms.
- **Axios**: Simplified HTTP client for API requests.

---

## Prerequisites

Ensure you have the following installed on your machine:

1. **Node.js**: Version `18.x`.
2. **Yarn**: Latest stable version.

---

## Steps to Run the Project Locally

1. Install Dependencies:
   `yarn install`

2. Run the Development Server:
   `yarn dev`

3. Access the App:
   Open your browser and go to:  
   `http://localhost:3000/`

---

## Key Packages and Usage

- **React Hook Form + Zod**:
  - Used for handling and validating forms for adding or editing tasks.

- **React Query**:
  - Manages API calls for tasks (e.g., fetching, updating, deleting).

- **Axios**:
  - Handles HTTP requests to the backend.

- **Tailwind CSS + Shadcn/UI**:
  - Provides responsive and reusable components for a modern UI.
 
## Deployment

This project is deployed using **Vercel**. You can access the live application at:

[Live Application Link](https://emaar-frontend.vercel.app/)

