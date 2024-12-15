import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext, Words } from "../context/Language";
import { apiUrl } from "../env";

const Sidebar = () => {
  const [data, setData] = useState(null);
  const [brand, setBrand] = useState([]);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const controller = new AbortController(); // <-- create controller

    fetch(apiUrl + `/api/productapi/getallparent`, {
      credentials: "include",
      // signal: controller.signal // <-- pass signal to request
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
        setData(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return () => controller.abort();
  }, []);
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
    <div className="col-lg-3 order-2 order-lg-1 d-none d-lg-block">
      <aside className="sidebar ">
        <h5 className="font-weight-semi-bold pt-3">
          {Words[language].Categories}
        </h5>
        <ul className="nav nav-list flex-column">
          {data &&
            data.map((item) => (
              <li className="nav-item" key={item.id}>
                <Link
                  onClick={topFunction}
                  to={"/category/" + item.id.toString()}
                  className="nav-link"
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
        <h5 className="font-weight-semi-bold pt-3">{Words[language].Brands}</h5>
        <div className="mb-3 pb-1">
          {brand &&
            brand.slice(0, 23).map((item) => (
              <Link
                onClick={topFunction}
                to={"/products/" + item.categoryId + "?brand=" + item.id}
                key={item.id}
              >
                <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                  {item.name}
                </span>
              </Link>
            ))}
          <Link to="/brands" onClick={topFunction}>
            <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-3 py-1 me-1">
              ...
            </span>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
