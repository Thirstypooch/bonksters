# Bonkster's Food Buddy - Project Context & Agent Directives

## PART 1: PROJECT IMPLEMENTATION PLAN

This section defines the project's features, technology, and a step-by-step implementation plan, acting as the primary source of truth for development tasks.

### 1. Feature Analysis

#### 1.1. Identified Features:
* [cite_start]**User Authentication:** Secure user sign-up, sign-in, and session management using Supabase Auth[cite: 25, 55].
* [cite_start]**Restaurant Discovery:** View a list of all available restaurants and filter them[cite: 58].
* [cite_start]**Restaurant Details:** View a specific restaurant's menu, organized by categories[cite: 58].
* [cite_start]**Menu Interaction:** View details of individual menu items[cite: 53].
* [cite_start]**Shopping Cart:** Add/remove items and update quantities[cite: 34, 63]. The cart state is managed on the client.
* [cite_start]**Checkout Process:** A complete workflow to place an order, using saved addresses and payment info[cite: 64].
* [cite_start]**Order Management:** Create orders in the database and view order history[cite: 58, 65].
* [cite_start]**Profile Management:** Users can view and update their personal details[cite: 65].
* [cite_start]**Type-Safe API:** A fully type-safe API layer connecting the frontend and backend[cite: 28].

#### 1.2. Feature Categorization:
* **Must-Have Features:** User Authentication, Restaurant Discovery, Restaurant Details, Shopping Cart, Checkout Process, Order Management.
* **Should-Have Features:** Profile Management, Real-time Order Tracking (future phase).
* **Nice-to-Have Features:** Promotional Code System, User Reviews and Ratings.

### 2. Recommended & Established Tech Stack

[cite_start]The technology stack has been carefully selected for type-safety, developer experience, and scalability[cite: 18].

#### 2.1. Core Stack:
* [cite_start]**Language:** **TypeScript** - For end-to-end static typing, improving code quality and maintainability[cite: 19].
    * **Documentation:** [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
* [cite_start]**Meta-Framework:** **Next.js (App Router)** - Handles routing, server-side rendering, and build optimizations[cite: 20].
    * **Documentation:** [https://nextjs.org/docs](https://nextjs.org/docs)
* [cite_start]**UI Library:** **React** - The core library for building the user interface[cite: 22].
    * **Documentation:** [https://react.dev/](https://react.dev/)

#### 2.2. Backend & Data:
* [cite_start]**Backend-as-a-Service (BaaS):** **Supabase** - Provides a Postgres database, Authentication, and File Storage[cite: 24, 25].
    * **Documentation:** [https://supabase.com/docs](https://supabase.com/docs)
* [cite_start]**ORM:** **Drizzle** - A TypeScript ORM for type-safe SQL-like queries and schema definition[cite: 26, 27].
    * **Documentation:** [https://orm.drizzle.team/docs/overview](https://orm.drizzle.team/docs/overview)
* [cite_start]**API Layer:** **tRPC** - For building fully type-safe APIs without schema generation[cite: 28, 29].
    * **Documentation:** [https://trpc.io/docs/](https://trpc.io/docs/)

#### 2.3. State Management & Tooling:
* [cite_start]**Server-State:** **TanStack Query (React Query)** - Manages asynchronous data-fetching, caching, and state synchronization[cite: 32, 33].
    * **Documentation:** [https://tanstack.com/query/latest/docs/react/overview](https://tanstack.com/query/latest/docs/react/overview)
* [cite_start]**Client-State:** **Zustand** - For managing global client-side state like the shopping cart[cite: 34, 35].
    * **Documentation:** [https://docs.pmnd.rs/zustand/getting-started/introduction](https://docs.pmnd.rs/zustand/getting-started/introduction)
* [cite_start]**Schema Validation:** **Zod** - Ensures data validity from user input to the database[cite: 30, 31].
    * **Documentation:** [https://zod.dev/](https://zod.dev/)
* [cite_start]**Styling:** **Tailwind CSS** & **shadcn/ui** - For utility-first styling and a pre-built component library[cite: 23].
    * **Documentation:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs) & [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)

### 3. Implementation Stages

[cite_start]The project has already completed its initial setup and migration to Next.js[cite: 37, 39, 40]. [cite_start]The frontend UI is functional with mock data[cite: 48]. We are beginning **Phase 2** of the detailed roadmap.

#### Phase 1: Backend Foundation (COMPLETED)
*This phase was completed in the previous step.*
- [x] Set up Supabase project
- [x] Create database tables (users, restaurants, menu_items, orders, order_items) via SQL Editor
- [x] Install Drizzle ORM and required dependencies
- [x] Define Drizzle schema in `src/db/schema.ts` to match SQL tables
- [x] Configure Drizzle client in `src/db/index.ts`

#### Phase 2: API Layer Construction (tRPC)
**Status: In Progress**
**Objective:** Build the type-safe communication channel between client and server.
- [ ] **Task 2.1:** Install tRPC packages (`@trpc/server`, `@trpc/client`, `@trpc/react-query`, `@trpc/next`).
- [ ] **Task 2.2:** Set up the tRPC server context in `src/server/trpc/context.ts`.
- [ ] **Task 2.3:** Initialize the main tRPC router (`src/server/trpc/root.ts`) and server-side helper (`src/server/trpc/trpc.ts`).
- [ ] **Task 2.4:** Create the tRPC API route handler at `src/app/api/trpc/[trpc]/route.ts`.
- [ ] **Task 2.5:** Create the first sub-router for restaurants: `src/server/trpc/routers/restaurant.ts`.
- [ ] **Task 2.6:** Implement the `getRestaurants` procedure in the restaurant router, using the Drizzle client to fetch all restaurants.
- [ ] **Task 2.7:** Implement the `getRestaurantById` procedure, using Zod for input validation (`z.object({ id: z.string().uuid() })`) and Drizzle to fetch a single restaurant.
- [ ] **Task 2.8:** Create routers for `user.ts` and `orders.ts` with placeholder procedures.

#### Phase 3: Frontend & Backend Integration
**Dependencies:** Phase 2 completion.
- [ ] **Task 3.1:** Create the tRPC client provider (`src/lib/trpc/Provider.tsx`) and wrap the root layout with it.
- [ ] **Task 3.2:** Refactor the home page (`src/app/page.tsx`) to replace the mock `restaurantData` array with a `trpc.restaurants.getRestaurants.useQuery()` hook.
- [ ] **Task 3.3:** Refactor the restaurant details page (`src/app/restaurant/[id]/page.tsx`) to use the `trpc.restaurants.getRestaurantById.useQuery()` hook.
- [ ] **Task 3.4:** Implement loading states using skeletons for a better user experience while data is being fetched.
- [ ] **Task 3.5:** Implement error states to show a user-friendly message if the API call fails.

#### Phase 4: Core Features & Functionality
**Dependencies:** Phase 3 completion.
- [ ] **Task 4.1:** Create a Zustand store (`src/lib/store/cart.ts`) to manage cart state (items, quantities).
- [ ] **Task 4.2:** Implement "Add to Cart" functionality in `MenuItem.tsx` to update the Zustand store.
- [ ] **Task 4.3:** Implement the checkout process, culminating in a call to an `orders.createOrder` tRPC mutation.
- [ ] **Task 4.4:** Implement user profile management features (e.g., updating user details, viewing order history) using tRPC procedures.

---

## PART 2: AGENT WORKFLOW & DIRECTIVES

This section defines your operational protocol as a development agent. Adherence is mandatory.

### Core Workflow Process

#### Before Starting Any Task
1.  **Consult This Document:** Review the current `Implementation Stages` to identify the next available task.
2.  **Check Dependencies:** Ensure all prerequisite tasks and stages are complete.
3.  **Verify Scope:** Understand the objective of the task based on the feature analysis.

#### Task Execution Protocol
1.  **Assess Task:** Read the sub-task from the `Implementation Stages` list. For complex tasks, break it down into a temporary todo list before coding.
2.  **Research Documentation:** If a technology is involved, use the official documentation links provided in the `Tech Stack` section before implementing.
3.  **Follow Project Structure:** The current project structure is defined by the Next.js App Router paradigm. New backend-related files should be placed logically within `src/`:
    * tRPC server files: `src/server/trpc/`
    * Database files (Drizzle): `src/db/`
    * Library/utility files (Providers, hooks, etc.): `src/lib/`
    * Always check existing file patterns before creating new ones.
4.  **UI/UX Implementation:** The UI is already built. When connecting data, ensure it fits the existing `shadcn/ui` components without altering the established design.
5.  **Task Completion:** Mark a `- [ ]` task as complete (`- [x]`) **only when**:
    * All functionality for the task is implemented correctly.
    * The code adheres to the project structure guidelines.
    * The application runs without errors (`npm run dev`).
    * The implementation is consistent with the established architecture.

### Critical Rules
- **NEVER** deviate from the established technology stack without explicit instruction.
- **NEVER** mark tasks complete without verifying the application runs correctly.
- **ALWAYS** follow the project structure. New files must be placed in appropriate directories.
- **ALWAYS** use the official documentation for guidance on implementing new features with our stack.
- **ALWAYS** follow this workflow process for every task. Your goal is to build a cohesive, well-documented, and maintainable project by methodically following this plan.