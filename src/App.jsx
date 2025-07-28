import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Courses from "./components/pages/Courses";
import Detail from "./components/pages/Detail";
import Register from "./components/pages/Register";
import MyCourses from "./components/account/MyCourses";
import ChangePassword from "./components/account/ChangePassword";
import WatchCourse from "./components/account/WatchCourse";
import Login from "./components/pages/Login";
import MyLearning from "./components/pages/MyLearning";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/course-enrolled" element={<MyLearning />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/watch-course" element={<WatchCourse />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
