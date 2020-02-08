import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { _Layout } from './pages/Layout';
import { Provider } from 'react-redux';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Route path="/" component={_Layout}></Route>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
