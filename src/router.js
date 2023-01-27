import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ErrorPage from "./views/NotFound";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Datasheet from "./components/Datasheet";
import ManageQuery from "./views/ManageQuery";

const Router = () => {
  const isAuthenticated = localStorage.getItem("resolverUser");

  return (
    <>
      <BrowserRouter baseUrl="/">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/*" element={<Signin />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/createQuery" exact element={<ManageQuery action="create" />} />
              <Route path="/updateQuery/:id" exact element={<ManageQuery action="edit" />} />
              <Route path="*" element={<ErrorPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
