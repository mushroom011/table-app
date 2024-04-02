import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/app/App.tsx";
import Products from "./pages/products";
import PricePlans from "./pages/price-plans/PricePlans.tsx";
import Pages from "./pages/pages";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products/",
        element: <Products />,
      },
      {
        path: "price-plans/",
        element: <PricePlans />,
      },
      {
        path: "pages/",
        element: <Pages />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
