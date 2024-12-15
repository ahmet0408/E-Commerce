const NotFound = () => {
  return (
    <div className="container">
      <section className="http-error">
        <div className="row justify-content-center py-3">
          <div className="col-md-7 text-center">
            <div className="http-error-main">
              <h2>404!</h2>
              <p>
                We're sorry, but the page you were looking for doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
