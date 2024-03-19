import { configureStore } from "@reduxjs/toolkit";

import heroSlice from "./slices/hero";

const store = configureStore({
    reducer: {
        hero: heroSlice
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
