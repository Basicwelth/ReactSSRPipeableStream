import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
// Mount it on the Store
export const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
});
// Then run the sagas
sagaMiddleware.run(rootSaga);
