import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ErrorPage from "./views/404";
import Login from "./views/Login";
import Datasheet from "./views/Datasheet";
import QueryModal from "./views/QueryModal";

const Router = () => {
  return (
    <>
      <BrowserRouter baseUrl="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createQuery" exact element={<QueryModal />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
