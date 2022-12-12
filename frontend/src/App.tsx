import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BoardLayout from "./components/BoardLayout";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Boards from "./pages/Boards";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";


export default function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path="current-user" element={<UserProfile />} />
                
                <Route path="boards" element={<BoardLayout />}>
                  <Route index element={<Boards />} />
                </Route>
              </Route>
            </Route>

            {/* error path */}
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


