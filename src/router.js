import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ErrorPage from "./views/404";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Datasheet from "./components/Datasheet";
import QueryModal from "./views/QueryModal";

const Router = () => {
  const isAuthenticated = localStorage.getItem("resolverToken");

  return (
    <>
      <BrowserRouter baseUrl="/">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/createQuery" exact element={<QueryModal />} />
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
