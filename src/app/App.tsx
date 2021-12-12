import React from "react";
import "./App.css";

import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./AppRoutes";

import { SecurityContextProvider } from "../context/security-context";
import { BrowserRouter } from "react-router-dom";
import { NavigationPanel } from "./NavigationPanel";

function App() {
  return (
    <SecurityContextProvider>
      <BrowserRouter basename="/">
        <div className="d-flex flex-column h-100">
          <NavigationPanel />
          <div className="container mt-5">
            <main className="mt-5 flex-shrink-0">
              <AppRoutes />
            </main>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </SecurityContextProvider>
  );
}

export default App;
