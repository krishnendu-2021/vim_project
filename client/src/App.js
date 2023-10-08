import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NoMatch from "./components/NoMatch";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Video from "./components/Video";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home type="random" />} />
          <Route path="trend" element={<Home type="trend" />} />
          <Route path="subscription" element={<Home type="sub" />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="video">
            <Route path=":id" element={<Video />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Sidebar />
    </>
  );
}

export default App;
