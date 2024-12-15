import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart/Cart";
import { UserContext } from "../context/UserDetails";
import { Link } from "react-router-dom";

const OrderComplete = () => {
  const { user, handleUrl, orderItems, total, orderNumber } =
    useContext(UserContext);

  useEffect(() => {
    handleUrl(window.location.href);
  }, []);
  var s = Date().slice(4, Date().indexOf(":") - 2);

  return (
    <div role="main" className="main shop pb-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <ul className="breadcrumb breadcrumb-dividers-no-opacity font-weight-bold text-6 justify-content-center my-5">
              <li className="text-transform-none me-2">
                <Link
                  to="/shopping"
                  className="text-decoration-none text-color-dark text-color-hover-primary"
                >
                  Shopping Cart
                </Link>
              </li>
              <li className="text-transform-none text-color-dark me-2">
                <Link
                  to="/checkout"
                  className="text-decoration-none text-color-dark text-color-hover-primary"
                >
                  Checkout
                </Link>
              </li>
              <li className="text-transform-none text-color-dark">
                <Link
                  to="/complete"
                  className="text-decoration-none text-color-primary"
                >
                  Order Complete
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-width-3 border-radius-0 border-color-success">
              <div className="card-body text-center">
                <p className="text-color-dark font-weight-bold text-4-5 mb-0">
                  <i className="fas fa-check text-color-success me-1"></i> Sag
                  boluň! Siziň sargydyňyz kabul edildi!
                </p>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between py-3 px-4 my-4">
              <div className="text-center">
                <span>
                  Order Number <br />
                  <strong className="text-color-dark">
                    {orderItems.length > 0 && orderNumber}
                  </strong>
                </span>
              </div>
              <div className="text-center mt-4 mt-md-0">
                <span>
                  Date <br />
                  <strong className="text-color-dark">
                    {orderItems.length > 0 && s}
                  </strong>
                </span>
              </div>
              <div className="text-center mt-4 mt-md-0">
                <span>
                  Phone <br />
                  <strong className="text-color-dark">
                    {orderItems.length > 0 && user.phoneNumber}
                  </strong>
                </span>
              </div>
              <div className="text-center mt-4 mt-md-0">
                <span>
                  Total <br />
                  <strong className="text-color-dark">${total}</strong>
                </span>
              </div>
            </div>
            <div className="card border-width-3 border-radius-0 border-color-hover-dark mb-4">
              <div className="card-body">
                <h4 className="font-weight-bold text-uppercase text-4 mb-3">
                  Siziň sargytlaryňyz!
                </h4>
                <table className="shop_table cart-totals mb-0">
                  <tbody>
                    <tr>
                      <td colSpan="2" className="border-top-0">
                        <strong className="text-color-dark">Harytlar</strong>
                      </td>
                    </tr>
                    {orderItems &&
                      orderItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong className="d-block text-color-dark line-height-1 font-weight-semibold">
                              {item.name + " "}
                              <span className="product-qty">
                                x {item.quantity}
                              </span>
                            </strong>
                            <span className="text-1">{item.subCategory}</span>
                          </td>
                          <td className="text-end align-top">
                            <span className="amount font-weight-medium text-color-grey">
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
                    <tr className="total">
                      <td>
                        <strong className="text-color-dark text-3-5">
                          Total
                        </strong>
                      </td>
                      <td className="text-end">
                        <strong className="text-color-dark">
                          <span className="amount text-color-dark text-5">
                            ${total}
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="row pt-3">
								<div className="col-lg-6 mb-4 mb-lg-0">
									<h2 className="text-color-dark font-weight-bold text-5-5 mb-1">Billing Address</h2>
									<ul className="list list-unstyled text-2 mb-0">
										<li className="mb-0">John Doe Junior</li>
										<li className="mb-0">Street Name, City</li>
										<li className="mb-0">State AL 85001</li>
										<li className="mb-0">123 456 7890</li>
										<li className="mt-3 mb-0">abc@abc.com</li>
									</ul>
								</div>
								<div className="col-lg-6">
									<h2 className="text-color-dark font-weight-bold text-5-5 mb-1">Shipping Address</h2>
									<ul className="list list-unstyled text-2 mb-0">
										<li className="mb-0">John Doe Junior</li>
										<li className="mb-0">Street Name, City</li>
										<li className="mb-0">State AL 85001</li>
										<li className="mb-0">123 456 7890</li>
										<li className="mt-3 mb-0">abc@abc.com</li>
									</ul>
								</div>
							</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
