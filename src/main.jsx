import { createRoot } from "react-dom/client";
import Error from "./components/Error";
import AllTask from "./components/AllTask";
import Important from "./components/Important";
import TaskList from "./components/TaskList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

import App from "./App.jsx";
import Login from "./components/Login.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/alltask",
        element: <TaskList />,
      },
      { path: "/important", element: <Important /> },
      { path: "/today", element: <AllTask /> },
      { path: "/planned", element: <AllTask /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
