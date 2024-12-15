import { apiUrl } from "../../env";

const Register = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <h2 className="font-weight-bold text-5 mb-0">Register</h2>
        <form
          action={apiUrl + "/api/user/register"}
          id="frmSignUp"
          method="post"
        >
          <div className="row">
            <div className="form-group col">
              <label className="form-label text-color-dark text-3">
                FirstName <span className="text-color-danger">*</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                name="firstName"
                className="form-control form-control-lg text-4"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label className="form-label text-color-dark text-3">
                LastName <span className="text-color-danger">*</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                name="lastName"
                className="form-control form-control-lg text-4"
                required
              />
            </div>
          </div>
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
          <div className="row">
            <div className="form-group col">
              <p className="text-2 mb-2">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a href="#" className="text-decoration-none">
                  privacy policy.
                </a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <button
                type="submit"
                className="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                data-loading-text="Loading..."
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
