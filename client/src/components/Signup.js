import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

const Signup = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      dispatch(loginStart());
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
      console.error(error);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newuser = await axios.post("/auth/signup", { name, email, pass });
      if (newuser.status === 200) {
        navigate("/signin");
      }
    } catch (err) {}
  };
  return (
    <div>
      <dialog open id="loginPortal">
        <div class="title">
          <h1 class="headerText">please sign up to</h1>
          <img
            class="brandlogo"
            src="../assets/VIM__1_-removebg-preview.png"
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
                name="username"
                placeholder="Enter username"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div class="inputText">
              <label for="Email">Email</label>
              <input
                type="email"
                name="Email_phone"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email id"
                required
              />
            </div>

            <div class="inputText">
              <div class="passwordS">
                <label for="password">Password :</label>
                <input
                  type="password"
                  name="Password"
                  onChange={(e) => setPass(e.target.value)}
                  autocomplete="off"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div class="passwordS">
                <label for="password">Confirm Password :</label>
                <input
                  type="password"
                  name="Password"
                  autocomplete="off"
                  placeholder="Enter confirm password"
                  required
                />
              </div>
            </div>
            <div class="res-log">
              <button type="submit" class="loginBtn" onClick={handleClick}>
                Sign Up
              </button>
            </div>
          </section>
        </form>
        <h5 style={{ textAlign: "center", margin: "0" }}>OR</h5>
        <hr />
        <div class="otherOpt">
          <div class="fabIcon">
            <button onClick={handleGoogle}>
              <img
                src="../assets/google-g-2015-logo-png-transparent.png"
                alt=""
              />
              Sign up with Google
            </button>
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

export default Signup;
