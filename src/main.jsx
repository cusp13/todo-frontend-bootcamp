// This imports StrictMode from React. StrictMode is a wrapper that helps you 
// identify potential problems in your React application during development.
// It doesn't render any visible UI or affect production builds — it's just a development tool.
import { StrictMode } from 'react';
// Imports the createRoot function used to initialize the React 18+ app.
import { createRoot } from 'react-dom/client';
// Imports the Redux Provider component that makes the Redux store available to all components.
import { Provider } from 'react-redux';
// Imports the Redux store defined in your app.
import store from '../redux/store.js';
// Imports global CSS styles for the app.
import './index.css';
// Imports the root component of your React app.
import App from './App.jsx';
// This is the entry point of the React application, typically named index.jsx or main.jsx.
// document.getElementById('root') grabs the DOM element with id="root" from index.html.
const rootElement = document.getElementById('root');
// createRoot initializes the React app using React 18's concurrent features.
const root = createRoot(rootElement);
// .render mounts the component tree into the root DOM element.
root.render(
  <StrictMode>
    {/* Provider makes the Redux store available to all nested components */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);