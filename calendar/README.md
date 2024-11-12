# Calendar app buildable as web component

## How this app has been initialized?

This app has been initialized from create vite task, using the `react-swc-ts` template:
```shell
yarn create vite calendar --template react-swc-ts
```

Then react router has been added:
```
yarn add react-router-dom@6
```

## What is the intent?

Demonstrate how to expose a react app as a web component.
The app can run both as a `classic` react app and a web component app. Take a look :eyes: at the `:wc` suffixed scripts into package.json for the web component variant :wink:.