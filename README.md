# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# To Do This week
- refactor code a bit
- add all the new stuff (react query, fix routing page, test code etc...)
- Move onto RN

# Manual Deploy for now
- npm run build
- drop dist foler into netlify

# To Do Decided
- Integrate tailwind (DONE)
- Decide on Mantine v Daisy UI v Shadowcn v Radix v Daisy UI
- Integrate React Query + Zustand: Test with component only, then test with zustand (https://www.youtube.com/watch?v=QTZTUrAbjeo&t=131s)
- Typescript everything, create all the types etc in shared folder
- Testing: Cypress and React Testing Library seem to be the main 2, see how to structure 
- fix folder structure to make more sense

# Next Js ?? (React Vite or Next JS)
- Deploying: if im using any server side comps, would need a Manage server(Vercel, Netlify, Firebase) or Self Servers (AWS, digital ocean)
- Functionality: Next Pro's are SEO, i dont plan on doing this

# React Vite ?? (React Vite or Next JS)
- React as next is trickier to deploy

# To Do not urgent


# To Do Bugs


# To Do features
- Host can message in event/exchange
- Rating System
- Chat 
- Internationalize


Daisy UI Pros and Cons
Pros
-Nice looking components
Cons
Bad Accessibility
need a specific react package to integrate into react

# Testing
https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests


# To Research
React query + zustand
issue of server data v frontend data format
type v interface
folder structure
Case for headless UI libraries: https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268
Forms and error handling

# React architechture
STYLING - Tailwind with ? + ?
GLOBAL STATE - Context + (Zustand - MAYBE I WILL TRY IT / React query - YES)
TESTING - Cypress or React Testing Library or both
FORMS - ?

# React Folder Structure
└── src/
    ├── assets/ (# assets folder can contain all the static files such as images, fonts, etc.)
    ├── api/ (api calls)
    |-- types
    ├── configs/ (# global configurations, exported env variables etc.)
    ├── components/
    │   ├── auth/
    │   │   └── SignUpForm.tsx
    │   ├── payment/
    │   │   └── PaymentForm.tsx
    │   ├── common/
    │   │   └── Button.tsx
    │   └── employees/
    │       ├── EmployeeList.tsx
    │       └── EmployeeSummary.tsx
    ├── hooks/
    │   ├── auth/
    │   │   └── useAuth.ts
    │   ├── payment/
    │   │   └── usePayment.ts
    │   └── employees/
    │       ├── useEmployees.ts
    │       └── useUpdateEmployee.ts
    ├── lib/
    ├── services/
    ├── states/
    └── utils/


Zustand / React Query (TO CONSIDER)