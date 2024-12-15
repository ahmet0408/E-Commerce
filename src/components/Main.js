import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cart/Cart";
import { FavouriContext } from "../context/Favouri";
import { UserContext } from "../context/UserDetails";
import { Link } from "react-router-dom";
import { LanguageContext, Words } from "../context/Language";
import { apiUrl } from "../env";

const Main = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { isFavouri, addToFavouri, removeFromFavouri } =
    useContext(FavouriContext);
  const { handleUrl } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const [discount, setDiscount] = useState([]);
  const [stock, setStock] = useState([]);
  const [neww, setNeww] = useState([]);

  useEffect(() => {
    fetch(apiUrl + `/api/productapi/GetAllDiscountProduct`, {
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
        setDiscount(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    fetch(apiUrl + `/api/productapi/getallstockproduct`, {
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
        setStock(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    fetch(apiUrl + `/api/productapi/getallnewproduct`, {
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
        setNeww(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    handleUrl(window.location.href);
  }, []);

  return (
    <div className="col-lg-9 order-1 order-lg-2">
      <div
        className="row products product-thumb-info-list"
        data-plugin-options="{'layoutMode': 'fitRows'}"
      >
        <Link
          className="nav-item text-decoration-none"
          to="/products?parent=stock"
        >
          <h5
            className="font-weight-bold mb-3 mt-2"
            style={{ color: "#0088CC", fontSize: "14px" }}
          >
            {Words[language].Stock} <i className="fas fa-arrow-right"></i>
          </h5>
        </Link>
        {stock &&
          stock.slice(0, 4).map((item) => (
            <div className="col-6 col-sm-6 col-lg-3" key={item.id}>
              <div className="product mb-0">
                <div className="product-thumb-info border-0 mb-3">
                  <div className="product-thumb-info-badges-wrapper">
                    {item.isNew && (
                      <span className="badge badge-ecommerce badge-success">
                        NEW
                      </span>
                    )}
                    {item.discountPrice > 0 && (
                      <span className="badge badge-ecommerce badge-danger">
                        -{item.discountPrice}%
                      </span>
                    )}
                  </div>

                  <div className="addtocart-btn-wrapper">
                    {!cartItems.find((itemm) => itemm.id === item.id) ? (
                      <a
                        className="text-decoration-none addtocart-btn"
                        onClick={() => {
                          addToCart(item);
                        }}
                        title="Sebede goş!"
                      >
                        <i className="icons icon-bag"></i>
                      </a>
                    ) : (
                      <div
                        className="quantity float-none m-0"
                        style={{
                          backgroundColor: "#28A745",
                          borderRadius: "20px",
                          height: "27px",
                          width: "85px",
                        }}
                      >
                        <button
                          className="plus text-color-white text-4"
                          style={{ border: "none", top: "-7px" }}
                          onClick={() => {
                            addToCart(item);
                          }}
                        >
                          +
                        </button>
                        <p className="input-text text-color-white text m-0">
                          {
                            cartItems.find((itemm) => itemm.id === item.id)
                              .quantity
                          }
                        </p>
                        <button
                          className="minus text-color-white text-4"
                          style={{ border: "none", top: "-8px" }}
                          onClick={() => {
                            const cartItem = cartItems.find(
                              (itemm) => itemm.id === item.id
                            );
                            if (cartItem.quantity === 1) {
                              removeFromCart(item);
                            } else {
                              removeFromCart(item);
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                    )}
                  </div>

                  <Link
                    to={"/productdetail/" + item.id + "?cat=" + item.categoryId}
                    className="quick-view text-uppercase font-weight-semibold text-2"
                  >
                    QUICK VIEW
                  </Link>
                  <div className="product-thumb-info-image">
                    <img
                      alt=""
                      className="img-fluid"
                      style={{ height: "220px" }}
                      src={
                        apiUrl + "/admindata/Product/Product/" + item.imagePath
                      }
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <a
                      href={"about"}
                      className="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-1"
                    >
                      {item.subCategory}
                    </a>
                    <h3 className="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0">
                      <a
                        href="shop-product-sidebar-right.html"
                        className="text-color-dark text-color-hover-primary"
                      >
                        {item.name}
                      </a>
                    </h3>
                  </div>
                  {isFavouri(item) ? (
                    <a
                      onClick={() => removeFromFavouri(item)}
                      className="text-decoration-none text-color-default text-color-hover-dark text-4"
                    >
                      <i style={{ color: "red" }} className="fa fa-heart"></i>
                    </a>
                  ) : (
                    <a
                      className="text-decoration-none text-color-default text-color-hover-dark text-4"
                      onClick={() => {
                        addToFavouri(item);
                      }}
                    >
                      <i className="far fa-heart"></i>
                    </a>
                  )}
                </div>
                <p className="price text-5 mb-3">
                  {item.discountPrice > 0 ? (
                    <>
                      <span className="sale text-color-dark font-weight-semi-bold">
                        $
                        {Math.round(
                          item.regularPrice -
                            (item.regularPrice / 100) * item.discountPrice
                        )}
                      </span>
                      <span className="amount">${item.regularPrice}</span>
                    </>
                  ) : (
                    <span className="sale text-color-dark font-weight-semi-bold">
                      ${item.regularPrice}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div
        className="row products product-thumb-info-list"
        data-plugin-options="{'layoutMode': 'fitRows'}"
      >
        <Link
          className="nav-item text-decoration-none"
          to="/products?parent=disc"
        >
          <h5
            className="font-weight-bold mb-3"
            style={{ color: "#0088CC", fontSize: "14px" }}
          >
            {Words[language].Disc} <i className="fas fa-arrow-right"></i>
          </h5>
        </Link>
        {discount &&
          discount.slice(0, 4).map((item) => (
            <div className="col-6 col-sm-6 col-lg-3" key={item.id}>
              <div className="product mb-0">
                <div className="product-thumb-info border-0 mb-3">
                  <div className="product-thumb-info-badges-wrapper">
                    {item.isNew && (
                      <span className="badge badge-ecommerce badge-success">
                        NEW
                      </span>
                    )}
                    {item.discountPrice > 0 && (
                      <span className="badge badge-ecommerce badge-danger">
                        -{item.discountPrice}%
                      </span>
                    )}
                  </div>

                  <div className="addtocart-btn-wrapper">
                    {!cartItems.find((itemm) => itemm.id === item.id) ? (
                      <a
                        className="text-decoration-none addtocart-btn"
                        onClick={() => {
                          addToCart(item);
                        }}
                        title="Sebede goş!"
                      >
                        <i className="icons icon-bag"></i>
                      </a>
                    ) : (
                      <div
                        className="quantity float-none m-0"
                        style={{
                          backgroundColor: "#28A745",
                          borderRadius: "20px",
                          height: "27px",
                          width: "85px",
                        }}
                      >
                        <button
                          className="plus text-color-white text-4"
                          style={{ border: "none", top: "-7px" }}
                          onClick={() => {
                            addToCart(item);
                          }}
                        >
                          +
                        </button>
                        <p className="input-text text-color-white text m-0">
                          {
                            cartItems.find((itemm) => itemm.id === item.id)
                              .quantity
                          }
                        </p>
                        <button
                          className="minus text-color-white text-4"
                          style={{ border: "none", top: "-8px" }}
                          onClick={() => {
                            const cartItem = cartItems.find(
                              (itemm) => itemm.id === item.id
                            );
                            if (cartItem.quantity === 1) {
                              removeFromCart(item);
                            } else {
                              removeFromCart(item);
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                    )}
                  </div>

                  <Link
                    to={"/productdetail/" + item.id + "?cat=" + item.categoryId}
                    className="quick-view text-uppercase font-weight-semibold text-2"
                  >
                    QUICK VIEW
                  </Link>
                  <div className="product-thumb-info-image">
                    <img
                      alt=""
                      className="img-fluid"
                      style={{ height: "220px" }}
                      src={
                        apiUrl + "/admindata/Product/Product/" + item.imagePath
                      }
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <a
                      href={"about"}
                      className="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-1"
                    >
                      {item.subCategory}
                    </a>
                    <h3 className="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0">
                      <a
                        href="shop-product-sidebar-right.html"
                        className="text-color-dark text-color-hover-primary"
                      >
                        {item.name}
                      </a>
                    </h3>
                  </div>
                  {isFavouri(item) ? (
                    <a
                      onClick={() => removeFromFavouri(item)}
                      className="text-decoration-none text-color-default text-color-hover-dark text-4"
                    >
                      <i style={{ color: "red" }} className="fa fa-heart"></i>
                    </a>
                  ) : (
                    <a
                      className="text-decoration-none text-color-default text-color-hover-dark text-4"
                      onClick={() => {
                        addToFavouri(item);
                      }}
                    >
                      <i className="far fa-heart"></i>
                    </a>
                  )}{" "}
                </div>
                <p className="price text-5 mb-3">
                  {item.discountPrice > 0 ? (
                    <>
                      <span className="sale text-color-dark font-weight-semi-bold">
                        $
                        {Math.round(
                          item.regularPrice -
                            (item.regularPrice / 100) * item.discountPrice
                        )}
                      </span>
                      <span className="amount">${item.regularPrice}</span>
                    </>
                  ) : (
                    <span className="sale text-color-dark font-weight-semi-bold">
                      ${item.regularPrice}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div
        className="row products product-thumb-info-list"
        data-plugin-options="{'layoutMode': 'fitRows'}"
      >
        <Link
          className="nav-item text-decoration-none"
          to="/products?parent=new"
        >
          <h5
            className="font-weight-bold mb-3"
            style={{ color: "#0088CC", fontSize: "14px" }}
          >
            {Words[language].New} <i className="fas fa-arrow-right"></i>
          </h5>
        </Link>
        {neww &&
          neww.slice(0, 4).map((item) => (
            <div className="col-6 col-sm-6 col-lg-3" key={item.id}>
              <div className="product mb-0">
                <div className="product-thumb-info border-0 mb-3">
                  <div className="product-thumb-info-badges-wrapper">
                    {item.isNew && (
                      <span className="badge badge-ecommerce badge-success">
                        NEW
                      </span>
                    )}
                    {item.discountPrice > 0 && (
                      <span className="badge badge-ecommerce badge-danger">
                        -{item.discountPrice}%
                      </span>
                    )}
                  </div>

                  <div className="addtocart-btn-wrapper">
                    {!cartItems.find((itemm) => itemm.id === item.id) ? (
                      <a
                        className="text-decoration-none addtocart-btn"
                        onClick={() => {
                          addToCart(item);
                        }}
                        title="Sebede goş!"
                      >
                        <i className="icons icon-bag"></i>
                      </a>
                    ) : (
                      <div
                        className="quantity float-none m-0"
                        style={{
                          backgroundColor: "#28A745",
                          borderRadius: "20px",
                          height: "27px",
                          width: "85px",
                        }}
                      >
                        <button
                          className="plus text-color-white text-4"
                          style={{ border: "none", top: "-7px" }}
                          onClick={() => {
                            addToCart(item);
                          }}
                        >
                          +
                        </button>
                        <p className="input-text text-color-white text m-0">
                          {
                            cartItems.find((itemm) => itemm.id === item.id)
                              .quantity
                          }
                        </p>
                        <button
                          className="minus text-color-white text-4"
                          style={{ border: "none", top: "-8px" }}
                          onClick={() => {
                            const cartItem = cartItems.find(
                              (itemm) => itemm.id === item.id
                            );
                            if (cartItem.quantity === 1) {
                              removeFromCart(item);
                            } else {
                              removeFromCart(item);
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                    )}
                  </div>

                  <Link
                    to={"/productdetail/" + item.id + "?cat=" + item.categoryId}
                    className="quick-view text-uppercase font-weight-semibold text-2"
                  >
                    QUICK VIEW
                  </Link>
                  <div className="product-thumb-info-image">
                    <img
                      alt=""
                      className="img-fluid"
                      style={{ height: "220px" }}
                      src={
                        apiUrl + "/admindata/Product/Product/" + item.imagePath
                      }
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <a
                      href={"about"}
                      className="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-1"
                    >
                      {item.subCategory}
                    </a>
                    <h3 className="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0">
                      <a
                        href="shop-product-sidebar-right.html"
                        className="text-color-dark text-color-hover-primary"
                      >
                        {item.name}
                      </a>
                    </h3>
                  </div>
                  {isFavouri(item) ? (
                    <a
                      onClick={() => removeFromFavouri(item)}
                      className="text-decoration-none text-color-default text-color-hover-dark text-4"
                    >
                      <i style={{ color: "red" }} className="fa fa-heart"></i>
                    </a>
                  ) : (
                    <a
                      className="text-decoration-none text-color-default text-color-hover-dark text-4"
                      onClick={() => {
                        addToFavouri(item);
                      }}
                    >
                      <i className="far fa-heart"></i>
                    </a>
                  )}{" "}
                </div>
                <p className="price text-5 mb-3">
                  {item.discountPrice > 0 ? (
                    <>
                      <span className="sale text-color-dark font-weight-semi-bold">
                        $
                        {Math.round(
                          item.regularPrice -
                            (item.regularPrice / 100) * item.discountPrice
                        )}
                      </span>
                      <span className="amount">${item.regularPrice}</span>
                    </>
                  ) : (
                    <span className="sale text-color-dark font-weight-semi-bold">
                      ${item.regularPrice}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Main;
