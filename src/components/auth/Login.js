import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserDetails";
import { apiUrl } from "../../env";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    var phoneNumber = e.target.phoneNumber.value;
    var password = e.target.password.value;
    const response = await fetch(apiUrl + "/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        password,
      }),
    });
    const data = await response.json();
    setUser(data);
    if (!data.isAuthenticated) {
      e.target.password.value = "";
    }
    setRedirect(true);
  };

  if (redirect && user.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5 mb-5 mb-lg-0">
        <h2 className="font-weight-bold text-5 mb-0">Login</h2>
        {user && !user.isAuthenticated && (
          <div className="text-danger">Ulanyjynyň maglumatlary nädogry!</div>
        )}
        <form
          id="frmSignIn"
          onSubmit={handleSubmit}
          className="needs-validation"
        >
          <div className="row">
            <div className="form-group col">
              <label className="form-label text-color-dark text-3">
                Phone Number <span className="text-color-danger">*</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                name="phoneNumber"
                className="form-control form-control-lg text-4"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label className="form-label text-color-dark text-3">
                Password <span className="text-color-danger">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg text-4"
                required
              />
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="form-group col-md-auto">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="rememberme"
                />
                <label
                  className="form-label custom-control-label cur-pointer text-2"
                  htmlFor="rememberme"
                >
                  Remember Me
                </label>
              </div>
            </div>
            <div className="form-group col-md-auto">
              <Link
                className="text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2"
                to="/auth/register"
              >
                Do you have an account?
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <button
                type="submit"
                className="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                data-loading-text="Loading..."
              >
                Login
              </button>
              {/* <div className="divider">
											<span className="bg-light px-4 position-absolute left-50pct top-50pct transform3dxy-n50">or</span>
										</div>
										<a href="#" className="btn btn-primary-scale-2 btn-modern w-100 text-transform-none rounded-0 font-weight-bold align-items-center d-inline-flex justify-content-center text-3 py-3" data-loading-text="Loading..."><i className="fab fa-facebook text-5 me-2"></i> Login With Facebook</a> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
