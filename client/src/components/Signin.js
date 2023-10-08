import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, email, pass });

      if (res.status === 200) {
        dispatch(loginSuccess(res.data));
        navigate("/");
      } else {
        alert(res.resp);
      }
    } catch (error) {
      dispatch(loginFailure());
      console.log(error);
    }
  };
  return (
    <div>
      <dialog open id="loginPortal">
        <div class="title">
          <h1 class="headerText">login to</h1>
          <img
            class="brandlogo"
            src="./assets/VIM__1_-removebg-preview.png"
            height="40"
            alt="logo"
          />
        </div>

        <form action="formaction" method="get" id="logindetail">
          <section class="userDetail">
            <div class="inputText">
              <label for="UserId">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name "
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div class="inputText">
              <label for="EmailorPhoneNumber">Email</label>
              <input
                type="email"
                name="Email_phone"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="inputText">
              <div class="checkbox">
                <label for="password">Password</label>
                <label class="showPassword" for="showPassword">
                  <input
                    type="checkbox"
                    name="showPassword"
                    id="showPassword"
                  />
                  Show Password
                </label>
              </div>
              <input
                type="password"
                name="Password"
                autocomplete="off"
                placeholder="Enter password"
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <label for="forgotPassword" class="fgtP">
                <a href="#forgotPassword">Forgot Password?</a>
              </label>
            </div>
            <div class="res-log">
              <button type="reset" class="resetBtn">
                Reset
              </button>
              <button type="submit" class="loginBtn" onClick={handleClick}>
                Login
              </button>
            </div>
          </section>
        </form>
        <p class="signUp">
          New user? <Link to="/signup">Sign up</Link>
        </p>
        <h4></h4>
        <div class="otherOpt">
          <div class="fabIcon">
            <a href="#loginWithGoogle">
              <img
                src="./assets/google-g-2015-logo-png-transparent.png"
                alt=""
              />
            </a>
          </div>
        </div>

        <footer>
          <p class="join">
            Please join with us through login and enjoy your journey.
          </p>
        </footer>
      </dialog>
    </div>
  );
};

export default Signin;
