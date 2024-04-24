import { RouteObject } from "react-router-dom";

import Login from "./page/Login";
import Home from "./page/Home";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];
