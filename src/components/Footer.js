import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../env";

const Footer = () => {
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    fetch(apiUrl + `/api/productapi/getallbrand`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setBrand(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <footer id="footer" className="footer-texts-more-lighten">
      <div className="container">
        <div className="row pt-3 pb-0 my-0">
          <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <h5 className="text-4 text-color-light mb-3">Biz barada</h5>
            <ul className="list list-unstyled">
              <li className="pb-1 mb-2">
                <span className="d-block font-weight-normal line-height-1 text-color-light">
                  SALGYMYZ
                </span>
                Aşgabat şäheri, 10 ýyl Abadançylyk şaýoly, 12 jaýy
              </li>
              <li className="pb-1 mb-2">
                <span className="d-block font-weight-normal line-height-1 text-color-light">
                  Telefon
                </span>
                <a href="tel:+1234567890">(993) 61-12-34-56</a>
              </li>
              <li className="pb-1 mb-2">
                <span className="d-block font-weight-normal line-height-1 text-color-light">
                  EMAIL
                </span>
                <a href="mailto:mail@example.com">mail@example.com</a>
              </li>
              <li className="pb-1 mb-2">
                <span className="d-block font-weight-normal line-height-1 text-color-light">
                  Iş wagty{" "}
                </span>
                DU - ŞE / 9:00 - 8:00
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <h5 className="text-4 text-color-light mb-3">
              Biziň hyzmatlarymyz
            </h5>
            <ul className="list list-unstyled mb-0">
              <li className="mb-0">
                <a href="contact-us-1.html">Eltip bermek hyzmaty</a>
              </li>
              <li className="mb-0">
                <a href="services.html">Tölegleriň nagt däl görnüşi</a>
              </li>
              <li className="mb-0">
                <a href={"about"}>Hilimiziň kepilligi</a>
              </li>
              <li className="mb-0">
                <a href={"about"}>Ulanyjy bilen aragatnaşyk</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4 mb-5 mb-md-0">
            <h5 className="text-4 text-color-light mb-3">Meşhur markalar</h5>
            <ul className="list list-unstyled list-inline mb-0">
              {brand &&
                brand.slice(0, 18).map((item, index) => (
                  <li key={index} className="list-inline-item">
                    <Link
                      onClick={topFunction}
                      to={"/products/" + item.categoryId + "?brand=" + item.id}
                      className="badge badge-dark rounded border border-color-light-3 font-weight-normal text-2 p-2"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-copyright footer-copyright-style-2 py-1">
          <div className="row align-items-center justify-content-md-between">
            <div className="col-12 col-md-auto text-center text-md-start mb-2 mb-md-0">
              <p className="mb-0">Website © 2024. Hemme hukuklar goragly</p>
            </div>
            <div className="col-12 col-md-auto"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
