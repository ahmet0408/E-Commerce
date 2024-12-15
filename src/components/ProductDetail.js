import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cart/Cart";
import { useParams, useSearchParams } from "react-router-dom";
import useScript from "./useScript";
import Carousel from "./Carousel";
import { UserContext } from "../context/UserDetails";
import { LanguageContext, Words } from "../context/Language";
import { FavouriContext } from "../context/Favouri";
import { apiUrl } from "../env";

const ProductDetail = () => {
  useScript("/assets/js/views/view.shop.js");
  useScript("/assets/js/theme.init.js");
  useScript("/assets/js/examples/examples.gallery.js");
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get("cat");
  const [product, setProduct] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { isFavouri, addToFavouri, removeFromFavouri } =
    useContext(FavouriContext);
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const { handleUrl } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const controller = new AbortController();
    if (!id) {
      return () => controller.abort();
    }
    fetch(apiUrl + `/api/productapi/getproductwithid/` + id, {
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
        setProductDetail(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });

    handleUrl(window.location.href);
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          apiUrl + `/api/productapi/getallproductwithcategoryid/` + cat,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setProduct(actualData.data);
      } catch (err) {
        console.log(err.message);
      } finally {
      }
    };
    getData();
  }, [id]);
  const size = window.screen.width;
  const myStyle = {
    width: "100%",
    height: size < 768 ? "200px" : "350px",
  };

  return (
    <div className="col-lg-9 order-1 order-lg-2">
      <div className="row mt-3">
        <div className="col-6 col-lg-6">
          <div className="thumb-gallery-wrapper">
            <div className="thumb-gallery-detail owl-carousel owl-theme manual nav-inside nav-style-1 nav-dark mb-3">
              <div style={myStyle}>
                <img
                  style={myStyle}
                  alt=""
                  className="img-fluid"
                  src={
                    apiUrl +
                    "/admindata/Product/Product/" +
                    productDetail.imagePath
                  }
                  data-zoom-image={
                    apiUrl +
                    "/admindata/Product/Product/" +
                    productDetail.imagePath
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-6">
          <div className="summary entry-summary position-relative">
            <h1 className="mb-0 font-weight-bold text-7">
              {productDetail.name}
            </h1>

            <div
              className="divider divider-small"
              style={
                size < 768 ? { margin: "2px auto" } : { margin: "22px auto" }
              }
            >
              <hr
                className="bg-color-grey-scale-4"
                style={size < 768 ? { margin: "2px 0" } : { margin: "22px 0" }}
              />
            </div>

            <p className="price mb-3">
              {productDetail.discountPrice > 0 ? (
                <>
                  <span className="sale text-color-dark">
                    $
                    {Math.round(
                      productDetail.regularPrice -
                        (productDetail.regularPrice / 100) *
                          productDetail.discountPrice
                    )}
                  </span>
                  <span className="amount">${productDetail.regularPrice}</span>
                </>
              ) : (
                <span className="sale text-color-dark">
                  ${productDetail.regularPrice}
                </span>
              )}
            </p>

            <p className="text-3-5 mb-0 mb-lg-3">
              {productDetail.shortDescription}
            </p>
            <hr
              style={size < 768 ? { margin: "2px 0" } : { margin: "22px 0" }}
            />
            {!cartItems.find((itemm) => itemm.id === productDetail.id) ? (
              <button
                type="submit"
                onClick={() => {
                  addToCart(productDetail);
                }}
                className="btn btn-dark btn-modern text-uppercase bg-color-hover-primary border-color-hover-primary"
              >
                Add to cart
              </button>
            ) : (
              <div
                style={
                  size < 768 ? { marginBottom: 0 } : { marginBottom: "25px" }
                }
                className="quantity quantity-lg"
              >
                <input
                  type="button"
                  onClick={() => {
                    const cartItem = cartItems.find(
                      (itemm) => itemm.id === productDetail.id
                    );
                    if (cartItem.quantity === 1) {
                      removeFromCart(productDetail);
                    } else {
                      removeFromCart(productDetail);
                    }
                  }}
                  className="minus text-color-hover-light bg-color-hover-primary border-color-hover-primary"
                  value="-"
                />
                <input
                  type="text"
                  className="input-text qty text"
                  title="Qty"
                  value={
                    cartItems.find((itemm) => itemm.id === productDetail.id)
                      .quantity
                  }
                  name="quantity"
                  min="1"
                  step="1"
                />
                <input
                  type="button"
                  onClick={() => {
                    addToCart(productDetail);
                  }}
                  className="plus text-color-hover-light bg-color-hover-primary border-color-hover-primary"
                  value="+"
                />
              </div>
            )}
            <hr
              style={size < 768 ? { margin: "2px 0" } : { margin: "22px 0" }}
            />

            <div className="d-flex align-items-center">
              {isFavouri(productDetail) ? (
                <a
                  onClick={() => removeFromFavouri(productDetail)}
                  className="d-flex align-items-center text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2"
                >
                  <i style={{ color: "red" }} className="fa fa-heart me-1"></i>{" "}
                  SAVE TO WISHLIST
                </a>
              ) : (
                <a
                  className="d-flex align-items-center text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2"
                  onClick={() => {
                    addToFavouri(productDetail);
                  }}
                >
                  <i className="far fa-heart me-1"></i> SAVE TO WISHLIST
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="solid my-4" />
      <h4 className="mb-3">
        {Words[language].Related} <strong>{Words[language].Products}</strong>
      </h4>
      {product.length > 0 && (
        <Carousel productList={product} currentProduct={productDetail.id} />
      )}
    </div>
  );
};

export default ProductDetail;
