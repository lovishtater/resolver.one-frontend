import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ErrorPage from "./views/404";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Datasheet from "./views/Datasheet";
import QueryModal from "./views/QueryModal";

const Router = () => {
  return (
    <>
      <BrowserRouter baseUrl="/">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/createQuery" exact element={<QueryModal />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
