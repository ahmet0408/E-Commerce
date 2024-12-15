import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart/Cart";
import { UserContext } from "../context/UserDetails";
import useScript from "./useScript";
import { LanguageContext, Words } from "../context/Language";
import { apiUrl } from "../env";
const Header = () => {
  useScript("/assets/js/views/view.shop.js");
  useScript("/assets/js/theme.init.js");
  useScript("/assets/js/views/view.home.js");
  useScript("/assets/vendor/circle-flip-slideshow/js/jquery.flipshow.min.js");
  const { cartItems, totalPrice, remove } = useContext(CartContext);
  const { user, clearUser, url } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [parent, setParent] = useState([]);
  const fixUrl = url.replace("&", "!");
  const { language, setLanguage } = useContext(LanguageContext);

  var qw;
  if (user == null) {
    qw = "/auth/login";
  } else {
    qw = "/checkout";
  }

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
        setParent(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return () => controller.abort();
  }, []);
  const size = window.screen.width;
  const Click = () => {
    var sd = document.getElementsByClassName("open").length;
    if (size < 992) {
      if (sd == 0) {
        document.getElementById("122").classList.add("open");
      } else {
        document.getElementById("122").classList.remove("open");
      }
    }
  };
  return (
    <header
      id="header"
      style={{ height: "70px" }}
      // className="header-effect-shrink"
      data-plugin-options="{'stickyEnabled': true,'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 135, 'stickySetTop': '-135px', 'stickyChangeLogo': true}"
    >
      <div
        style={{ backgroundColor: "#ccc" }}
        className="header-body header-body-bottom-border-fixed box-shadow-none border-top-0 "
      >
        <div className="header-container container">
          <div className="header-row">
            <div className="header-column w-100">
              <div className="header-row justify-content-between">
                <div className="header-logo z-index-2 col-lg-2 col-xl-2 px-0">
                  <Link to="/">
                    <img
                      alt="Porto"
                      width="100"
                      height="48"
                      data-sticky-width="82"
                      data-sticky-height="40"
                      data-sticky-top="84"
                      src="/assets/img/logo-default-slim.png"
                    />
                  </Link>
                </div>
                <div className="header-nav-features header-nav-features-no-border col-lg-5 col-xl-5 ps-2 mx-0">
                  <div className="header-nav-feature ps-lg-5 pe-lg-4">
                    <form role="search" method="get">
                      <div className="search-with-select">
                        <a
                          href="#"
                          id="122"
                          onClick={Click}
                          className="mobile-search-toggle-btn me-2"
                          data-porto-toggle-class="open"
                        >
                          <i className="icons icon-magnifier text-color-dark text-color-hover-primary"></i>
                        </a>
                        <div className="search-form-wrapper input-group">
                          <input
                            style={{
                              backgroundColor: "rgba(13, 13, 14, 0.12)",
                            }}
                            className="form-control text-1"
                            id="headerSearch"
                            name="q"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={
                              language === "ru"
                                ? "Поиск по названию продукта..."
                                : language === "tk"
                                ? "Harydy ady boýunça gözle..."
                                : "Search by product name..."
                            }
                          />
                          <div
                            className="search-form-select-wrapper d-flex align-items-center"
                            style={{
                              backgroundColor: "rgba(13, 13, 14, 0.12)",
                            }}
                          >
                            <Link
                              to={query == "" ? "/" : "/search?q=" + query}
                              className="btn"
                              type="submit"
                            >
                              <i className="icons icon-magnifier header-nav-top-icon text-color-dark"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <ul className="header-extra-info col-lg-2 col-xl-2 ps-xl-0 d-lg-block ">
                  <li className="d-none d-sm-inline-flex ms-0">
                    <div className="header-extra-info-icon ms-lg-0">
                      <i className="icons icon-phone text-3 text-color-dark position-relative top-1"></i>
                    </div>
                    <div className="header-extra-info-text">
                      <label
                        className="text-1 font-weight-semibold text-color-default"
                        style={{ textTransform: "uppercase" }}
                      >
                        {Words[language].Contact}
                      </label>
                      <strong className="text-4">
                        <a
                          href="tel:+1234567890"
                          className="text-color-hover-primary text-decoration-none"
                        >
                          +99312 345678
                        </a>
                      </strong>
                    </div>
                  </li>
                </ul>
                <div className="d-flex col-lg-3 col-xl-3 pe-0 ps-0">
                  <ul className="header-extra-info d-flex justify-content-between align-items-center w-100">
                    <hr
                      style={{
                        width: "1px",
                        marginRight: "5px",
                        height: "30px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    />
                    <li className="ms-0 me-2 dropdown">
                      <Link
                        className="text-decoration-none ps-1 text-color-dark text-color-hover-primary"
                        style={{ fontSize: "2rem" }}
                        to="#"
                        role="button"
                        id="dropdownLanguage"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="icon-globe icons"></i>
                      </Link>
                      <div
                        className="dropdown-menu dropdown-menu-arrow-centered min-width-0 "
                        aria-labelledby="dropdownLanguage"
                      >
                        <a
                          onClick={() => setLanguage("tk")}
                          className="dropdown-item"
                          href={
                            apiUrl +
                            "/admin/setlanguage?culture=tk&returnUrl=" +
                            fixUrl
                          }
                        >
                          TKM
                        </a>
                        <Link
                          onClick={() => setLanguage("ru")}
                          className="dropdown-item"
                          to={
                            apiUrl +
                            "/admin/setlanguage?culture=ru&returnUrl=" +
                            fixUrl
                          }
                        >
                          RUS
                        </Link>
                        <Link
                          onClick={() => setLanguage("en")}
                          className="dropdown-item"
                          to={
                            apiUrl +
                            "/admin/setlanguage?culture=en&returnUrl=" +
                            fixUrl
                          }
                        >
                          ENG
                        </Link>
                      </div>
                    </li>
                    <hr
                      style={{
                        width: "1px",
                        marginRight: "5px",
                        height: "30px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    />

                    {!user ? (
                      <li className="ms-0 me-2">
                        <div className="header-extra-info-icon">
                          <Link
                            to="/auth/login"
                            className="text-decoration-none text-color-dark text-color-hover-primary text-2"
                          >
                            <i
                              style={{ fontSize: "2rem" }}
                              className="icon-login icons"
                            ></i>
                          </Link>
                        </div>
                      </li>
                    ) : (
                      <li className="ms-0 me-2">
                        <div className="header-nav-features header-nav-features-no-border order-1 order-lg-2 mx-0 px-0">
                          <div
                            className="header-nav-feature header-nav-features-user header-nav-features-user-logged d-inline-flex mx-0 pe-0"
                            id="headerAccount"
                          >
                            <a
                              href="#"
                              className="header-nav-features-toggle d-flex justify-content-center align-items-center"
                            >
                              <i
                                style={{ fontSize: "2rem" }}
                                className="icons icon-user"
                              ></i>{" "}
                              <span
                                className="d-none d-lg-block"
                                style={{ paddingTop: "4px" }}
                              >
                                {user.userName}
                              </span>
                            </a>
                            <div
                              className="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed header-nav-features-dropdown-force-right"
                              id="headerTopUserDropdown"
                            >
                              <div className="row">
                                <div className="col-8">
                                  <p className="mb-0 pb-0 text-2 line-height-1 pt-1">
                                    Hello,
                                  </p>
                                  <p>
                                    <strong className="text-color-dark text-4">
                                      Ahmet
                                    </strong>
                                  </p>
                                </div>
                                <div className="col-4">
                                  <div className="d-flex justify-content-end">
                                    <img
                                      className="rounded-circle"
                                      width="40"
                                      height="40"
                                      alt=""
                                      src="assets/img/profile.jpg"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <ul className="nav nav-list-simple flex-column text-3">
                                    <li className="nav-item">
                                      <a className="nav-link" href="#">
                                        My Profile
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a className="nav-link" href="#">
                                        My Orders
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link border-bottom-0"
                                        href="/"
                                        onClick={clearUser}
                                      >
                                        Log Out
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div
                          className="header-nav-features header-nav-features-no-border"
                          style={{ marginLeft: 0, paddingLeft: 0 }}>
                          <div
                            className="header-nav-feature header-nav-features-user header-nav-features-user-logged d-inline-flex mx-0 pe-0"
                            id="headerAccount">
                            <a
                              href="#"
                              className="header-nav-features-toggle d-flex align-items-center">                                 
                              <i
                                style={{ fontSize: "2rem" }}
                                className="icons icon-user">                                  
                                </i>
                              <div
                                className="d-none d-lg-block"
                                style={{ paddingTop: "4px" }}>
                                {user.userName}
                              </div>
                            </a>
                            <div
                              style={{ minWidth: "190px" }}
                              className="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed header-nav-features-dropdown-force-right"
                              id="headerTopUserDropdown">
                              <div className="row">
                                <div className="col-8">
                                  <p className="d-flex justify-content-center align-items-center text-3 mb-0 pt-2 text-uppercase">
                                    {user.userName}
                                  </p>
                                </div>
                                <div className="col-4">
                                  <div className="d-flex justify-content-end">
                                    <img
                                      className="rounded-circle"
                                      width="30"
                                      height="30"
                                      alt=""
                                      src="/assets/img/logo.jpg"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <ul className="nav nav-list-simple flex-column text-3">
                                    <li className="nav-item">
                                      <a className="nav-link" href="#">
                                        My Profile
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a className="nav-link" href="#">
                                        My Orders
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <Link
                                        to="/"
                                        className="nav-link border-bottom-0"
                                        onClick={clearUser}>
                                        Log Out
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </li>
                    )}
                    <hr
                      style={{
                        width: "1px",
                        marginRight: "5px",
                        height: "30px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    />
                    <li className="mx-0">
                      <div className="header-extra-info-icon">
                        <Link
                          to="/favouri"
                          className="text-decoration-none text-color-dark text-color-hover-primary text-2"
                        >
                          <i
                            style={{ fontSize: "2rem" }}
                            className="icons icon-heart"
                          ></i>
                        </Link>
                      </div>
                    </li>
                    <hr
                      style={{
                        width: "1px",
                        marginRight: "5px",
                        height: "30px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    />
                    <li className="ms-0 me-2">
                      <div className="header-nav-features ps-0 ms-0">
                        <div className="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex flex-wrap top-2 ms-0">
                          <a href="#" className="header-nav-features-toggle">
                            <img
                              src="/assets/img/icons/icon-cart-big.svg"
                              height="32"
                              alt=""
                              className="header-nav-top-icon-img"
                            />
                            <span className="cart-info">
                              <span className="cart-qty">
                                {cartItems.length}
                              </span>
                            </span>
                          </a>
                          <div
                            className="header-nav-features-dropdown"
                            id="headerTopCartDropdown"
                          >
                            <ol className="mini-products-list">
                              {cartItems.map((item) => (
                                <li
                                  className="item ms-0 px-3 pb-0 d-block"
                                  key={item.id}
                                >
                                  <Link
                                    to={"/productdetail/" + item.id}
                                    title=""
                                    className="product-image"
                                  >
                                    <img
                                      style={{ width: "55px", height: "40px" }}
                                      src={
                                        apiUrl +
                                        "/admindata/Product/Product/" +
                                        item.imagePath
                                      }
                                      alt=""
                                    />
                                  </Link>
                                  <div className="product-details">
                                    <p className="product-name m-0">
                                      <Link
                                        style={{ textDecoration: "none" }}
                                        to="#"
                                      >
                                        {item.name}{" "}
                                      </Link>
                                    </p>
                                    <p className="qty-price m-0">
                                      {item.quantity}X{" "}
                                      <span className="price">
                                        $
                                        {item.discountPrice > 0
                                          ? Math.round(
                                              item.regularPrice -
                                                (item.regularPrice / 100) *
                                                  item.discountPrice
                                            )
                                          : item.regularPrice}
                                      </span>
                                    </p>
                                    <Link
                                      onClick={(e) => {
                                        remove(item);
                                      }}
                                      title="Remove This Item"
                                      className="btn-remove"
                                    >
                                      <i className="fas fa-times"></i>
                                    </Link>
                                  </div>
                                </li>
                              ))}
                            </ol>
                            <div className="totals px-3 pb-0">
                              <span className="label">Total:</span>
                              <span className="price-total">
                                <span className="price">${totalPrice}</span>
                              </span>
                            </div>
                            <div className="actions">
                              <Link className="btn btn-dark" to="/shopping">
                                View Cart
                              </Link>
                              <Link className="btn btn-primary" to={qw}>
                                Checkout
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-block d-lg-none d-flex justify-content-between">
        <div className="col-6">
          <div>
            <button
              className="btn btn-modern btn-primary w-100"
              style={{ borderRadius: "6px", padding: "0.6rem" }}
              data-bs-toggle="modal"
              data-bs-target="#largeModal"
            >
              {Words[language].Categories}
            </button>

            <div
              className="modal fade pe-0"
              id="largeModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="largeModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-lg h-100 w-75"
                style={{ margin: "0 auto 0 0" }}
              >
                <div className="modal-content h-100">
                  <div className="modal-header">
                    <h4 className="modal-title" id="largeModalLabel">
                      {Words[language].Categories}
                    </h4>
                  </div>
                  <div className="modal-body ps-0 px-0">
                    <ul className="nav nav-list flex-column">
                      {parent &&
                        parent.map((item) =>
                          item.order == 2 ? (
                            <li
                              className="nav-item"
                              data-bs-dismiss="modal"
                              key={item.id}
                            >
                              <Link to="/" className="nav-link">
                                {item.name}
                              </Link>
                            </li>
                          ) : (
                            <li
                              className="nav-item"
                              data-bs-dismiss="modal"
                              key={item.id}
                            >
                              <Link
                                to={"/category/" + item.id.toString()}
                                className="nav-link"
                              >
                                {item.name}
                              </Link>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <Link
            to={"/brands"}
            className="btn btn-modern btn-primary w-100"
            style={{ borderRadius: "6px", padding: "0.6rem" }}
          >
            {Words[language].Brands}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
