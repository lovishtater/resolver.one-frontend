import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./views/Home";
import ErrorPage from "./views/404";

const Router = () => {
  return (
    <>
      <BrowserRouter baseUrl="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;