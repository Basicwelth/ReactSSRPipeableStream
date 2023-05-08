import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App, { Error } from './App';
import { Html } from './Html';
import { Layout } from './Layout';
const execEnv = require('exenv');

export const RoutesConfig = () => (
  <Routes>
	<Route path="/">
	  <Route index
		element={
		  <Provider store={store}>
			<App assets={execEnv.canUseDOM ? window.assets : ''} />
		  </Provider>
		}
	  />
	  <Route path={'*'} element={<ErrorElement />} />
	</Route>
  </Routes>
);

const ErrorElement = () => (
  <Html title={'Unresolved path'} assets={execEnv.canUseDOM ? window.assets : ''}>
	<Layout>
	  <Error />
	</Layout>
  </Html>
);
