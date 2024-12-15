import React, { useContext } from "react";
import { CartContext } from "../context/cart/Cart";
import { FavouriContext } from "../context/Favouri";
import { Link } from "react-router-dom";
import useScript from "./useScript";
import { apiUrl } from "../env";

const Carousel = ({ productList, currentProduct }) => {
  useScript("/assets/js/theme.init.js");
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { isFavouri, addToFavouri, removeFromFavouri } =
    useContext(FavouriContext);

  return (
    <div className="products row">
      <div className="col d-flex justify-content-center">
        <div
          className="owl-carousel owl-theme show-nav-title nav-dark mb-0"
          data-plugin-options="{'loop': false, 'autoplay': false,'items': 4, 'nav': true, 'dots': false, 'margin': 20, 'autoplayHoverPause': true, 'autoHeight': true}"
        >
          {productList.map(
            (item) =>
              item.id != currentProduct && (
                <div
                  className="product mb-0 d-flex justify-content-center flex-wrap"
                  key={item.id}
                >
                  <div className="product-thumb-info border-0 mb-3 mx-1 col-6 col-lg-12">
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
                      to={
                        "/productdetail/" + item.id + "?cat=" + item.categoryId
                      }
                      className="quick-view text-uppercase font-weight-semibold text-2"
                    >
                      QUICK VIEW
                    </Link>
                    <div className="product-thumb-info-image">
                      <img
                        src={
                          apiUrl +
                          "/admindata/product/product/" +
                          item.imagePath
                        }
                        alt=""
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "200px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-6 col-lg-12 mx-5 d-flex justify-content-between">
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
                        onClick={() => {
                          addToFavouri(item);
                        }}
                        className="text-decoration-none text-color-default text-color-hover-dark text-4"
                      >
                        <i className="far fa-heart"></i>
                      </a>
                    )}
                  </div>
                  <p className="col-6 col-lg-12 price text-5 mb-3">
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
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
