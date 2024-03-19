import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import { withSuspense } from "./hoc/withSuspense";
import MainPage from "./pages/main";
import CardPage from "./pages/card";
import NotFoundPage from "./pages/notfound";

const App = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={withSuspense(<MainPage />)} />
                <Route path="hero/:id" element={withSuspense(<CardPage />)} />
                <Route path="notfound" element={withSuspense(<NotFoundPage />)} />
                <Route path="*" element={<Navigate to={"/notfound"} replace />} />
            </Route>
        </Routes>
    );
};

export default App;
