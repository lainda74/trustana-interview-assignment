# Solution

## Key Features available in this app

*   **Dynamic Data Table**: The core of the application is a highly dynamic table that can render any set of columns. It displays a skeleton loading state during data fetches, preventing layout shifts and providing clear user feedback.

*   **Attribute Filtering**: A sophisticated dropdown filter allows users to filter the product list. This component is highly optimized, featuring:
    *   **Debounced Search**: Reduces the number of API requests while the user is typing.
    *   **Infinite Scrolling**: Efficiently loads a large list of attributes on demand as the user scrolls.

*   **Column Visibility Management**: Users can choose which columns to display through a "Manage Columns" dropdown. This preference is also saved in the URL, allowing for customized, shareable views of the data.

*   **Robust Error Handling**: The application is wrapped with a custom `ErrorBoundary` component that integrates with **Sentry**. This ensures that if a component fails, it won't crash the entire page. Instead, a user-friendly fallback UI is displayed, and the error is automatically reported for debugging.


## Development & Deployment

The project is built with a focus on code quality, consistency, and reliable deployments.

*   **Developer Experience (DX)**:
    *   **Husky & commitlint**: Git hooks are used to enforce code quality standards. A `pre-commit` hook runs the linter, and a `commit-msg` hook ensures all commit messages follow the **Conventional Commits** standard for a clean and readable version history.
    *   **Performance Metrics**: Perforamce Metrics are stored in Sentry.
    *   **Linting**: EsLint is added to for codebase maintainability and quality.

*   **End-to-End Testing**: The critical user flow of filtering data is covered by an E2E test written with **Playwright**. The test suite is configured to automatically start the development server, making it easy to run and validate application behavior.

*   **Containerization with Docker**: A multi-stage `Dockerfile` is provided to build a lightweight, secure, and optimized production image. I have used Vercel to deploy the app and Environment variables are configured at the deployment stage.

## Architectural Overview

The application primarily uses a pattern of Server Components for data fetching and Client Components for user interaction.

1.  **Server-Side Data Fetching**: The main dashboard page (`/dashboard`) is a **Server Component**. It is responsible for parsing URL search parameters (`page`, `attribute`, `sortKey`, etc.), constructing a data query, and fetching the initial dataset from the API. This ensures a fast initial page load with data already present in the HTML sent to the browser.

2.  **Client-Side Interactivity**: The fetched data is then passed to the `DashboardView` component, a **Client Component** that handles all user interactions. This includes managing the state for filters, column visibility, and triggering navigations for sorting and pagination.

3.  **URL as a Single Source of Truth**: A key architectural decision is the use of the URL's search parameters to manage the application's state. Any change, such as applying a filter, changing the page, updates the URL. This makes the application's state shareable, bookmarkable, and resilient to page reloads.

4. **Reusable Components**: All the reusable components are stored in 'src/components' folder.

5. Create (main) folder as a route group.

# Assumptions

1. The product and attributes endpoints are provided by REST APIs deployed on a separate backend service.

2. The current implementation does not handle user authentication or authorization. It is assumed that the API endpoints are either publicly accessible or that security is managed at a higher level (e.g., an API gateway or network infrastructure).


## Extra proof for Sentry and E2E testing
![Sentry Dashboard](https://drive.google.com/file/d/1jYfGpXeIoJ1cJumqb6EmmAy00-wOu3pa/view?usp=sharing)

![Playwright e2e dashboard](https://drive.google.com/file/d/1GoW64VRv5Nf4FT1UnHJK2IKNfWvi2niE/view?usp=sharing)