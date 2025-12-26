# Minimalist's Guide to the Cloud: Plan and Design

This document outlines the plan and design for the Minimalist's Guide to the Cloud, a suite of tools including a Cheat Sheet and a "Startup in a Box" infrastructure generator.

## 1. Project Objective

To create a comprehensive platform for developers that provides:
1.  **Knowledge**: A searchable cheat sheet for services and errors.
2.  **Tools**: Automated infrastructure generators ("Startup in a Box") to accelerate project setup.

## 2. Tech Stack

*   **Framework:** Next.js (with TypeScript)
*   **Styling:** Tailwind CSS
*   **Backend (API):** Next.js API Routes
*   **Database:** Local JSON files (initially) -> PostgreSQL/Serverless.
*   **Search:** `fuse.js` for client-side fuzzy search.
*   **Infrastructure Tools:** Docker, Terraform, Ansible (for the "Startup in a Box" artifacts).

## 3. Data Models

### `Topic` & `Article` & `CommonError`
(Used for the Cheat Sheet module - see existing definitions)

### `InfrastructureTemplate`
Represents a blueprint for the Startup in a Box generator.
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "components": ["vpc", "vm-dev", "vm-prod", "git-server"]
}
```

## 4. Pages and Routing

*   `/`: **Home Page:** Dashboard linking to available tools (Cheat Sheet, Generators).
*   `/cheatsheet`: **Cheat Sheet Home:** (Formerly `/`) Lists topics.
    *   `/cheatsheet/topics/[topicId]`: Topic Page.
    *   `/cheatsheet/articles/[articleId]`: Article Page.
    *   `/cheatsheet/errors`: Common Errors.
*   `/tools/startup-box`: **Startup in a Box Configurator:**
    *   Form to configure the startup stack (Project Name, Region, etc.).
    *   Generates and downloads the `installer` package.
*   `/admin`: **Admin Dashboard:** Content management.

## 5. Core Features

### 5.1. Cheat Sheet
*   Searchable knowledge base of GCP services and errors.

### 5.2. Startup in a Box (IaaS Generator)
*   **Web Interface**: A wizard to configure the desired infrastructure.
*   **Output**: Generates a downloadable ZIP or Docker command containing:
    *   `Dockerfile` (The Installer).
    *   `main.tf` (Terraform for GCP).
    *   `playbook.yml` (Ansible for VM setup).
*   **One-Click Execution**: User runs the generated Docker container to provision everything.

## 6. Future Enhancements
*   **LLM Integration**: Chat with the platform.
*   **More Generators**: Kubernetes clusters, Serverless stacks.


## 7. Development Plan

1.  **Phase 1: Project Setup & Core UI**
    *   Initialize a new Next.js project with TypeScript and Tailwind CSS.
    *   Create the basic page layouts and routing.
    *   Define the data models and create initial seed data in JSON files.
    *   Build the public-facing pages to display topics, articles, and errors from the JSON data.

2.  **Phase 2: Admin Panel**
    *   Set up admin-only routes.
    *   Implement authentication for the admin section.
    *   Build the CRUD interfaces for managing content.

3.  **Phase 3: Search Functionality**
    *   Integrate `fuse.js`.
    *   Create a search component and results page.

4.  **Phase 4: LLM Integration (Future)**
    *   Research and select an appropriate LLM provider.
    *   Develop an API route to handle chat requests.
    *   Build the chat interface.
