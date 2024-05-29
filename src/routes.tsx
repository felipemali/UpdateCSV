import { RouteObject } from "react-router-dom";

import Login from "./page/Login";
import Home from "./page/Home";
import Farm from "./page/Farm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/fazenda",
    element: <Farm />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];
