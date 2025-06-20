# 🛍️ **RS E-Commerce — Memory Mart**

\*\*Welcome to the Memory Mart, an online store created by LazyLoad as part of the RS School curriculum.

This isn’t just an e-commerce platform — it’s a journey through emotions, nostalgia, and dreams.
Our store is filled with magical and surreal items that seem to find you, not the other way around. Whether it’s a jar of summer rain or a suitcase full of longing, each visit brings new curiosities.

✨ Core Concept: The Dream Store
Memory Mart is a whimsical marketplace offering “objects” that exist somewhere between dreams and reality.
From spontaneous surprises to emotionally evocative filters — our store is designed to be felt, not just browsed.

## 🤝 **Team LazyLoad**

Alena Volf — @alvorie

Ekaterina Podorova — @gnarkill33

Nadezhda Novoselova — @nadin-nov

### **Tech Stack**

React
Vite
Vitest
TypeScript
CommerceTools API
ESLint + Prettier
Husky
Chakra UI

### **Project Status**

All planned sprints have been completed ✅

- Sprint 1: Project setup and CommerceTools integration

- Sprint 2: Login, registration, and main pages

- Sprint 3: Product catalog, detailed views, and user profile

- Sprint 4: Basket functionality, catalog improvements, and About Us page

## **Commercetools API Integration**

The project uses [**Commercetools**](https://commercetools.com/) — a headless e-commerce platform that provides REST and GraphQL APIs for managing products, carts, orders, and users.

**Project Configuration (in Merchant Center):**

- **Languages (Languages)**: en (English)
- **Currencies (Currencies)**: USD (US Dollar)
- **Countries (Countries)**: US, RU, BY
  (Products are available in the US, Russia, and Belarus)

**Environment Variables (.env):**

```env
VITE_CT_PROJECT_KEY=your_project_key
VITE_CT_CLIENT_ID=your_client_id
VITE_CT_CLIENT_SECRET=your_client_secret
VITE_CT_API_URL=https://api.europe-west1.gcp.commercetools.com/
VITE_CT_AUTH_URL=https://auth.europe-west1.gcp.commercetools.com/
```

### **Authorization and API Usage**

The project uses **manual authorization** via OAuth 2.0, without using the native Commercetools SDK.

## Setup & Usage

**To run the project locally:**

1. Clone the repository:

   `git clone https://github.com/your-username/memory-mart.git`

   `cd memory-mart`

2. Install dependencies:

   `npm install`

3. Run the development server:

   `npm run dev`

4. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

**To build the project:**
Run the following command to create a production build:

`npm run build`

**To preview the production build:**
`npm run preview`

---

## Available Scripts

In the project directory, you can run the following commands:

- **`npm run dev`** — Starts the development server with hot-reloading.
- **`npm run build`** — Compiles the TypeScript files and builds the production bundle.
- **`npm run format`** — Formats the code using Prettier.
- **`npm run ci:format`** — Checks for code formatting issues without applying changes.
- **`npm run lint`** — Runs ESLint to identify potential issues.
- **`npm run lint:fix`** — Automatically fixes ESLint issues.
- **`npm run stylelint`** — Lints CSS files using Stylelint.
- **`npm run test`** — Runs tests using Vitest.

### **Husky and Commit Hooks**

Husky is set up to ensure that code is linted and formatted before committing. The pre-commit hook will automatically run **Lint-Staged**, which runs ESLint and Prettier on your staged files.

---

**Note:** Just like our code, we believe in efficient loading — we only render what you need. But sometimes, a little bug might slip through... so if you find yourself buying too many whimsical items, blame it on the random() function.
