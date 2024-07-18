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

# Manual Deploy for now
- npm run build
- drop dist foler into netlify

# To Do
- Auth System with React Vite setup any see what extra fields i need vs what i get from firebase / google signup
- Add age restriction and sex feature
- Then try Auth System with React Native Expo 
- start building out mobile / next app

# Next Js ?? (React Vite or Next JS)
- Deploying: if im using any server side comps, would need a Manage server(Vercel, Netlify, Firebase) or Self Servers (AWS, digital ocean)
- Functionality: Next Pro's are SEO, i dont plan on doing this

# React Vite ?? (React Vite or Next JS)
- Not really for client side this project, just to get a working prototype, main app will be mobile 

# To Do Auth
- Auth System with next and hook it up to exchanges db, see how works
- 
- Add age range + sex picker to exchange creation (after auth though as we will get this info)
- 

# To Do not urgent
- Stop using ml-1 and use style props!
- Integrate Cypress - done
- Redux use with next db collection
- Maybe move to Next JS? (if need to use other server in future, would be an easier transition, good tech to know for other jobs) 

# To Do Bugs


# To Do features
- Host can message in event/exchange
- Rating System
- Chat 
- Internationalize