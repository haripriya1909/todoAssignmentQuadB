import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./App.jsx";
import Error from "./components/Error";
import AllTask from "./components/AllTask";
import Important from "./components/Important";
import TaskList from "./components/TaskList";
import Login from "./components/Login.jsx";
import "./index.css";

// Define routes for your app
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
      {
        path: "/important",
        element: <Important />,
      },
      {
        path: "/today",
        element: <AllTask />,
      },
      {
        path: "/planned",
        element: <AllTask />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

// Render the app with Redux and Router
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
