import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserDetails";
import { apiUrl } from "../env";

const Brands = () => {
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const { handleUrl } = useContext(UserContext);
  useEffect(() => {
    fetch(apiUrl + `/api/productapi/getallparent`, {
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
        setCategory(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    handleUrl(window.location.href);
  }, [handleUrl]);
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
    <div className="col-lg-9 order-1 order-lg-2">
      <div>
        <div
          className="row featured-boxes featured-boxes-style-4"
          data-plugin-options="{'layoutMode': 'fitRows'}"
        >
          {category &&
            category.map(
              (cat, index) =>
                cat.order !== 2 &&
                cat.order !== 1 && (
                  <>
                    <h4
                      key={index}
                      className="font-weight-bold m-1"
                      style={{
                        marginLeft: "40px",
                        letterSpacing: 1,
                        fontFamily: "cursive",
                        fontSize: "18px",
                      }}
                    >
                      {cat.name}
                    </h4>
                    {brand &&
                      brand.map(
                        (item, index) =>
                          item.parentId === cat.id && (
                            <div
                              className="col-3 col-sm-2 col-md-2 col-lg-2 m-0 p-0"
                              key={index}
                            >
                              <div className="m-1 featured-box featured-box-primary featured-box-effect-4 ">
                                <div
                                  className="box-content p-2"
                                  style={{
                                    backgroundColor: "white",
                                  }}
                                >
                                  <img
                                    src={
                                      apiUrl +
                                      "/admindata/Product/Brand/" +
                                      item.icon
                                    }
                                    alt="img"
                                    style={{
                                      width: "100%",
                                      height: "70px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                  <hr style={{ margin: "8px 0 0 0" }} />
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    onClick={topFunction}
                                    to={
                                      "/products/" +
                                      cat.id +
                                      "?brand=" +
                                      item.id
                                    }
                                  >
                                    <h6 className="font-weight-bold text-color-dark m-0 p-1 text-1 ">
                                      {item.name}
                                    </h6>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                  </>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default Brands;
