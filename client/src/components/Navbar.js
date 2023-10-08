import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const handlelogout = () => {
    setClick(true);
    dispatch(logout());
  };

  const [open, setOpen] = useState(false);

  const handleShowModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <>
      <section className="header-background d-flex">
        <nav
          className="navbar navbar-expand-lg py-1 col"
          aria-label="Offcanvas navbar large"
        >
          <div className="container-fluid">
            <div className="d-flex">
              <button
                id="toggleBtn"
                className=" btn btn-outline-dark px-0 align-items-center"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions"
                aria-controls="offcanvasWithBothOptions"
                aria-label="Toggle navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="25"
                  fill="currentColor"
                  className="bi bi-box-arrow-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"
                  />
                </svg>
              </button>

              <Link className="navbar-brand me-lg-5 p-0" to="/">
                <div className="">
                  <img
                    src="../assets/VIM__1_-removebg-preview.png"
                    alt="logo"
                    height="55"
                  />
                </div>
              </Link>
            </div>

            <div className="d-flex gradient-background">
              <div className="navbar-collapse collapse" id="navbarsExample05">
                <form
                  className="d-flex p-1"
                  role="search"
                  style={{ width: "100%" }}
                >
                  <input
                    className="form-control me-1"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className=" d-flex">
                    <button
                      className="btn btn-light d-flex align-items-center mx-1 "
                      type="submit"
                      style={{
                        borderBottomRightRadius: "50px",
                        borderTopRightRadius: "50px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                    <button
                      className="btn btn-secondary d-flex align-items-center mx-1"
                      type="microphone"
                      style={{ borderRadius: "50%" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-mic-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              {currentUser ? (
                <div
                  className="offcanvas offcanvas-end text-bg-dark"
                  tabIndex="-1"
                  id="offcanvasNavbar2"
                  aria-labelledby="offcanvasNavbar2Label"
                >
                  <div className="offcanvas-body">
                    <ul className="navbar-nav  justify-content-end flex-grow-1 pe-3">
                      <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                          <button className="btn btn-outline-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-plus-circle-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                            <h5
                              className="headIcontext"
                              onClick={handleShowModal}
                            >
                              Create
                            </h5>
                          </button>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                          <button className="btn btn-outline-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              fill="currentColor"
                              className="bi bi-bell-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                            </svg>
                            <h5 className="headIcontext">Notifications</h5>
                          </button>
                        </Link>
                      </li>

                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link"
                          to="/"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <button className="btn btn-outline-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              fill="currentColor"
                              className="bi bi-person-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                              <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                              />
                            </svg>
                            <h5 className="headIcontext">Profile</h5>
                          </button>
                        </Link>

                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/">
                              Your Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/">
                              Support
                            </Link>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              to="./public/feedback/feedbackPage.html"
                              target="_blank"
                            >
                              Feedback
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={handlelogout}
                            >
                              Log out
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="col-1">
                  <Link className="login" to="/signin">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </section>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
