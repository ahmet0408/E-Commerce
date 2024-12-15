import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart/Cart.js";
import useScript from "./useScript";
import OtherCarousel from "./OtherCarousel.js";
import { UserContext } from "../context/UserDetails";
import { LanguageContext, Words } from "../context/Language.js";
import { apiUrl } from "../env.js";

const ShoppingCart = () => {
  const [product, setProduct] = useState([]);
  const { language } = useContext(LanguageContext);
  useScript("/assets/js/theme.init.js");
  const {
    remove,
    cartItems,
    addToCart,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useContext(CartContext);
  const { user, handleUrl } = useContext(UserContext);
  var qw, qw1;
  if (user == null) {
    qw = "/auth/login";
  } else {
    qw = "/checkout";
  }
  if (user == null) {
    qw1 = "/auth/login";
  } else {
    qw1 = "/complete";
  }
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
        setProduct(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    handleUrl(window.location.href);
  }, []);

  return (
    <div role="main" className="main shop pb-4">
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="breadcrumb font-weight-bold text-6 justify-content-center my-5">
              <li className="text-transform-none me-2">
                <Link
                  to="/shopping"
                  className="text-decoration-none text-color-primary"
                >
                  Shopping Cart
                </Link>
              </li>
              <li className="text-transform-none text-color-grey-lighten me-2">
                <Link
                  to={qw}
                  className="text-decoration-none text-color-grey-lighten text-color-hover-primary"
                >
                  Checkout
                </Link>
              </li>
              <li className="text-transform-none text-color-grey-lighten">
                <Link
                  to={qw1}
                  className="text-decoration-none text-color-grey-lighten text-color-hover-primary"
                >
                  Order Complete
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row pb-4 mb-5">
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="table-responsive">
              <table className="shop_table cart">
                <thead>
                  <tr className="text-color-dark">
                    <th className="product-thumbnail" width="15%">
                      &nbsp;
                    </th>
                    <th className="product-name text-uppercase" width="30%">
                      Product
                    </th>
                    <th className="product-price text-uppercase" width="15%">
                      Price
                    </th>
                    <th className="product-quantity text-uppercase" width="20%">
                      Quantity
                    </th>
                    <th
                      className="product-subtotal text-uppercase text-end"
                      width="20%"
                    >
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((item) => (
                      <tr className="cart_table_item" key={item.id}>
                        <td className="product-thumbnail">
                          <div className="product-thumbnail-wrapper">
                            <a
                              onClick={() => remove(item)}
                              className="product-thumbnail-remove"
                              style={{ top: "8px", left: "78px" }}
                              title="Remove Product"
                            >
                              <i className="fas fa-times"></i>
                            </a>
                            <Link
                              to={"/productdetail/" + item.id}
                              // className="product-thumbnail-image"
                              title=""
                            >
                              <img
                                style={{ width: "90px", height: "70px" }}
                                alt=""
                                // className="img-fluid"
                                src={
                                  apiUrl +
                                  "/admindata/Product/Product/" +
                                  item.imagePath
                                }
                              />
                            </Link>
                          </div>
                        </td>
                        <td className="product-name">
                          <a
                            href="shop-product-sidebar-right.html"
                            className="font-weight-semi-bold text-color-dark text-color-hover-primary text-decoration-none"
                          >
                            {item.name}
                          </a>
                        </td>
                        <td className="product-price">
                          <span className="amount font-weight-medium text-color-grey">
                            $
                            {item.discountPrice > 0
                              ? Math.round(
                                  item.regularPrice -
                                    (item.regularPrice / 100) *
                                      item.discountPrice
                                )
                              : item.regularPrice}
                          </span>
                        </td>
                        <td className="product-quantity">
                          <div className="quantity float-none m-0">
                            <input
                              type="button"
                              className="minus text-color-hover-light bg-color-hover-primary border-color-hover-primary"
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
                              value="-"
                            />
                            <input
                              type="text"
                              className="input-text qty text"
                              title="Qty"
                              value={
                                cartItems.find((itemm) => itemm.id === item.id)
                                  .quantity
                              }
                              name="quantity"
                              min="1"
                            />
                            <input
                              type="button"
                              className="plus text-color-hover-light bg-color-hover-primary border-color-hover-primary"
                              onClick={() => {
                                addToCart(item);
                              }}
                              value="+"
                            />
                          </div>
                        </td>
                        <td className="product-subtotal text-end">
                          <span className="amount text-color-dark font-weight-bold text-4">
                            $
                            {item.discountPrice > 0
                              ? Math.round(
                                  item.regularPrice -
                                    (item.regularPrice / 100) *
                                      item.discountPrice
                                ) * item.quantity
                              : item.regularPrice * item.quantity}
                          </span>
                        </td>
                      </tr>
                    ))}

                  <tr>
                    <td colSpan="5">
                      <div className="row justify-content-between mx-0">
                        <div className="col-6 col-md-auto px-0">
                          <Link
                            to="/"
                            className="btn btn-light btn-modern text-color-dark bg-color-light-scale-2 text-color-hover-light bg-color-hover-primary text-uppercase text-3 font-weight-bold border-0 border-radius-0 btn-px-4 py-3"
                          >
                            Update Cart
                          </Link>
                        </div>
                        <div className="d-flex justify-content-end col-6 col-md-auto px-0">
                          <button
                            onClick={clearCart}
                            className="btn btn-light btn-modern text-color-dark bg-color-light-scale-2 text-color-hover-light bg-color-hover-primary text-uppercase text-3 font-weight-bold border-0 border-radius-0 btn-px-4 py-3"
                          >
                            Clear Cart
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4 position-relative">
            <div
              className="card border-width-3 border-radius-0 border-color-hover-dark"
              data-plugin-sticky
              data-plugin-options="{'minWidth': 991, 'containerSelector': '.row', 'padding': {'top': 85}}"
            >
              <div className="card-body">
                <h4 className="font-weight-bold text-uppercase text-4 mb-3">
                  Cart Totals
                </h4>
                <table className="shop_table cart-totals mb-4">
                  <tbody>
                    <tr className="cart-subtotal">
                      <td className="border-top-0">
                        <strong className="text-color-dark">Subtotal</strong>
                      </td>
                      <td className="border-top-0 text-end">
                        <strong>
                          <span className="amount font-weight-medium">
                            ${totalPrice}
                          </span>
                        </strong>
                      </td>
                    </tr>
                    <tr className="shipping">
                      <td colSpan="2">
                        <strong className="d-block text-color-dark mb-2">
                          Shipping
                        </strong>

                        <div className="d-flex flex-column">
                          <label
                            className="d-flex align-items-center text-color-grey mb-0"
                            htmlFor="shipping_method1"
                          >
                            <input
                              id="shipping_method1"
                              type="radio"
                              className="me-2"
                              name="shipping_method"
                              defaultValue="free"
                            />
                            Free Shipping
                          </label>
                          <label
                            className="d-flex align-items-center text-color-grey mb-0"
                            htmlFor="shipping_method2"
                          >
                            <input
                              id="shipping_method2"
                              type="radio"
                              className="me-2"
                              name="shipping_method"
                              value="local-pickup"
                            />
                            Local Pickup
                          </label>
                          <label
                            className="d-flex align-items-center text-color-grey mb-0"
                            htmlFor="shipping_method3"
                          >
                            <input
                              id="shipping_method3"
                              type="radio"
                              className="me-2"
                              name="shipping_method"
                              value="flat-rate"
                            />
                            Flat Rate: $5.00
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr className="total">
                      <td>
                        <strong className="text-color-dark text-3-5">
                          Total
                        </strong>
                      </td>
                      <td className="text-end">
                        <strong className="text-color-dark">
                          <span className="amount text-color-dark text-5">
                            ${totalPrice}
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link
                  to={qw}
                  className={
                    cartItems == []
                      ? "btn btn-dark btn-modern w-100 text-uppercase bg-color-hover-primary border-color-hover-primary border-radius-0 text-3 py-3"
                      : "btn btn-dark btn-modern w-100 text-uppercase bg-color-hover-primary border-color-hover-primary border-radius-0 text-3 py-3"
                  }
                >
                  Proceed to Checkout{" "}
                  <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4
              className="font-weight-semibold text-4 mb-3"
              style={{ textTransform: "uppercase" }}
            >
              {Words[language].Featured}
            </h4>
            <hr className="mt-0" />
            {product.length > 0 && <OtherCarousel productList={product} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
