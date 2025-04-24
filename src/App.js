import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Products from "./components/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./components/Category";
import { CartProvider } from "./context/cart/Cart.js";
import ShoppingCart from "./components/ShoppingCart";
import SidebarLayout from "./components/SidebarLayout.js";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Brands from "./components/Brands";
import NotFound from "./components/error/NotFound";
import { UserProvider } from "./context/UserDetails";
import OrderComplete from "./components/OrderComplete";
import { FavouriProvider } from "./context/Favouri";
import FavouriteProducts from "./components/FavouriteProducts";
import { LanguageProvider } from "./context/Language";
import "./style.css";
import { apiUrl } from "./env";
import SearchResult from "./components/SearchResult.js";

const App = () => {
  const [notyf, setNotyf] = useState(null);
  useEffect(() => {
    const fetchNotyf = async () => {
      const response = await fetch(apiUrl + "/api/notificationapi");
      const res = await response.json();
      setNotyf(res);
    };
    fetchNotyf();
  }, []);
  const close = () => {
    const notificationToast = document.querySelector("[data-toast]");
    notificationToast.classList.add("closed");
  };
  const modalClose = () => {
    const modal = document.querySelector("[data-modal]");
    modal.classList.add("closed");
  };
  return (
    <div style={{ backgroundColor: "rgba(13, 13, 14, 0.12)" }}>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <FavouriProvider>
              <LanguageProvider>
                <Header />
                {notyf && (
                  <div className="modall" data-modal>
                    <div
                      className="modall-close-overlay"
                      onClick={modalClose}
                      data-modal-overlay
                    ></div>

                    <div className="modall-content">
                      <button
                        className="modall-close-btn"
                        style={{ border: "none" }}
                        onClick={modalClose}
                        data-modal-close
                      >
                        <i className="fas fa-times"></i>
                      </button>

                      <div className="newsletter-img">
                        <img
                          src={
                            apiUrl + "/admindata/notification/" + notyf.image
                          }
                          alt="subscribe newsletter"
                          width="400"
                          height="400"
                        />
                      </div>
                      <div className="newsletter">
                        <form action="#">
                          <div className="newsletter-header">
                            <h3 className="newsletter-title">{notyf.title}</h3>

                            <p
                              className="newsletter-desc"
                              style={{ fontSize: "20px", fontStyle: "italic" }}
                            >
                              {notyf.shortDesc}
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                <div className="notification-toast" data-toast>
                  <button
                    className="toast-close-btn"
                    style={{ border: "none", background: "transparent" }}
                    onClick={close}
                    data-toast-close
                  >
                    <i className="fas fa-times"></i>
                  </button>

                  <div className="toast-banner">
                    <img
                      src="/assets/img/shoe-2_1.jpg"
                      alt="Rose Gold Earrings"
                      width="80"
                      height="70"
                    />
                  </div>

                  <div className="toast-detail">
                    <p className="toast-message m-0">Someone in new just</p>

                    <p className="toast-title m-0">Rose Gold Earrings</p>

                    <p className="toast-meta m-0">
                      <time dateTime="PT2M">2 Minutes</time> ago
                    </p>
                  </div>
                </div>
                <div role="main" className="main shop pt-5 pt-lg-4">
                  <div className="container">
                    <div className="row">
                      <Routes>
                        <Route element={<SidebarLayout />}>
                          <Route exact path="/" element={<Main />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/search" element={<SearchResult />} />
                          <Route
                            path="/productdetail/:id"
                            element={<ProductDetail />}
                          />
                          <Route path="/products/:id" element={<Products />} />
                          <Route path="/category/:id" element={<Category />} />
                          <Route path="/brands" element={<Brands />} />
                          <Route
                            path="/favouri"
                            element={<FavouriteProducts />}
                          />
                        </Route>

                        <Route path="/shopping" element={<ShoppingCart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/complete" element={<OrderComplete />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </div>
                </div>
                <Footer />
              </LanguageProvider>
            </FavouriProvider>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
