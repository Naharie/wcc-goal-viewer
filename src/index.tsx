import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './components/App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

/*
https://github.com/rommguy/react-custom-scroll
https://github.com/Naharie/wcc-goal-viewer
https://react-redux.js.org/introduction/getting-started
*/

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);