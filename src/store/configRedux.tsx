import { configureStore } from '@reduxjs/toolkit';
import rootWatcher from "@store/configSaga";
import { rootReducer } from "@store/redux/rootReducer";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: false,
    thunk: true
  }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootWatcher);

export const persistor = persistStore(store);

export default store;
