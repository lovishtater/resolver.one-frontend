import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ErrorPage from "./views/NotFound";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import ManageQuery from "./views/ManageQuery";

const allRoutes = [
  {
    path: "/",
    element: <Home />,
    private: true,
  },
  {
    path: "/signin",
    element: <Signin />,
    private: false,
  },
  {
    path: "/signup",
    element: <Signup />,
    private: false,
  },
  {
    path: "/createQuery",
    element: <ManageQuery action="create" />,
    private: true,
  },
  {
    path: "/updateQuery",
    element: <ManageQuery action="edit" />,
    private: true,
  },
  {
    path: "*",
    element: <ErrorPage />,
    private: false,
  },
]

const Router = () => {
  const user = localStorage.getItem("resolverUser");
  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map((route) => {
          if (route.private && !user) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Signin />}
              />
            );
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
