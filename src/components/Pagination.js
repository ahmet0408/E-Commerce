import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart/Cart";
import { Link } from "react-router-dom";
import useScript from "./useScript";
import { FavouriContext } from "../context/Favouri";
import { apiUrl } from "../env";

const Pagination = ({ productList, sort }) => {
  useScript("/assets/js/theme.init.js");
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { isFavouri, addToFavouri, removeFromFavouri } =
    useContext(FavouriContext);
  const [asc, setAsc] = useState([]);
  const ascArray = () => {
    const asc = productList.slice().sort((a, b) => {
      var p =
        a.discountPrice > 0
          ? Math.round(
              a.regularPrice - (a.regularPrice / 100) * a.discountPrice
            )
          : a.regularPrice;
      var p1 =
        b.discountPrice > 0
          ? Math.round(
              b.regularPrice - (b.regularPrice / 100) * b.discountPrice
            )
          : b.regularPrice;
      return p > p1 ? 1 : -1;
    });
    return asc;
  };
  const descArray = () => {
    const desc = productList.slice().sort((a, b) => {
      var p =
        a.discountPrice > 0
          ? Math.round(
              a.regularPrice - (a.regularPrice / 100) * a.discountPrice
            )
          : a.regularPrice;
      var p1 =
        b.discountPrice > 0
          ? Math.round(
              b.regularPrice - (b.regularPrice / 100) * b.discountPrice
            )
          : b.regularPrice;
      return p > p1 ? -1 : 1;
    });
    return desc;
  };
  useEffect(() => {
    if (sort == 0 || sort === undefined) {
      setAsc(productList);
    }
    if (sort == 1) {
      setAsc(ascArray());
    }
    if (sort == 2) {
      setAsc(descArray());
    }
  }, [sort, productList]);

  const [page, setPage] = useState(0);
  const [number, setNumber] = useState(1);
  const maxPage = Math.ceil(productList.length / 12);
  const onNextPage = () => setPage((page + 1) % maxPage);
  const onNumberPage = (x) => setPage(x - 1);
  const onPrevPage = () => {
    setPage((page + 12 - 1) % 12);
  };
  useEffect(() => {
    onNumberPage(number);
  }, [number]);

  const numbers = () => {
    let rows = [];
    for (let index = 0; index < maxPage; index++) {
      index == page
        ? rows.push(
            <li className="page-item active" key={index}>
              <a
                className="page-link text-decoration-none"
                onClick={() => setNumber(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          )
        : rows.push(
            <li className="page-item" key={index}>
              <a
                className="page-link text-decoration-none"
                onClick={() => setNumber(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          );
    }
    return rows;
  };

  return (
    <div>
      <div
        className="row products product-thumb-info-list"
        data-plugin-options="{'layoutMode': 'fitRows'}"
      >
        {asc &&
          asc.slice(page * 12, 12 * (page + 1)).map((item) => (
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

      <div className="row mt-4">
        <div className="col">
          <ul className="pagination float-end">
            {page == 0 ? (
              <li className="page-item disabled">
                <a className="page-link " onClick={onPrevPage}>
                  <i className="fas fa-angle-left"></i>
                </a>
              </li>
            ) : (
              <li className="page-item">
                <a className="page-link " onClick={onPrevPage}>
                  <i className="fas fa-angle-left"></i>
                </a>
              </li>
            )}
            {numbers()}
            {page == maxPage - 1 ? (
              <li className="page-item disabled">
                <a className="page-link" onClick={onNextPage}>
                  <i className="fas fa-angle-right"></i>
                </a>
              </li>
            ) : (
              <li className="page-item">
                <a className="page-link" onClick={onNextPage}>
                  <i className="fas fa-angle-right"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
