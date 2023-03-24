import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { PageLogin,
       } from "./page-login"
import { PageHome } from "./page-home"
import { PageRegistration } from "./page-registration";

import { } from "./page-login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLogin />, 
  },
  {
    path: "registration",
    element: <PageRegistration />,
  },
  {
    path: "home-page",
    element: <PageHome />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );