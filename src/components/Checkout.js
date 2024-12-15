import { useContext, useEffect, useState, useTransition } from "react";
import { CartContext } from "../context/cart/Cart";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserDetails";
import { apiUrl } from "../env";
const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const { handleUrl, setOrderNumber, setOrderItems, setTotal } =
    useContext(UserContext);
  useEffect(() => {
    handleUrl(window.location.href);
  }, []);
  var products = [];
  for (let i = 0; i <= cartItems.length - 1; i++) {
    var item = cartItems[i];
    products.push({
      productId: item.id,
      quantity: item.quantity,
    });
  }
  const handleClick = async (e) => {
    e.preventDefault();
    var address = e.target.address.value;
    const response = await fetch(apiUrl + "/Api/OrderApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      credentials: "include",
      body: JSON.stringify({
        address,
        phoneNumber: user.phoneNumber,
        products,
      }),
    });
    const data = await response.json();
    setOrderNumber(data);
    console.log(data);
    setOrderItems(cartItems);
    setTotal(totalPrice);
    clearCart();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/complete" />;
  }
  return (
    <div role="main" className="main shop pb-4">
      <div className="container">
        <div className="row">
          <div className="col">
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
                  className="text-decoration-none text-color-primary"
                >
                  Checkout
                </Link>
              </li>
              <li className="text-transform-none text-color-grey-lighten">
                <Link
                  to="/complete"
                  className="text-decoration-none text-color-grey-lighten text-color-hover-primary"
                >
                  Order Complete
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <form role="form" onSubmit={handleClick} className="needs-validation">
          <div className="row">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <h2 className="text-color-dark font-weight-bold text-5-5 mb-3">
                Müşderiniň maglumatlary
              </h2>
              <div className="row">
                <div className="form-group col">
                  <label className="form-label">
                    Salgyňyz <span className="text-color-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control h-auto py-2"
                    name="address"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5 position-relative">
              <div
                className="card border-width-3 border-radius-0 border-color-hover-dark"
                data-plugin-sticky
                data-plugin-options="{'minWidth': 991, 'containerSelector': '.row', 'padding': {'top': 85}}"
              >
                <div className="card-body">
                  <h4 className="font-weight-bold text-uppercase text-4 mb-3">
                    Your Order
                  </h4>
                  <table className="shop_table cart-totals mb-3">
                    <tbody>
                      <tr>
                        <td colSpan="2" className="border-top-0">
                          <strong className="text-color-dark">Product</strong>
                        </td>
                      </tr>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong className="d-block text-color-dark line-height-1 font-weight-semibold">
                              {item.name}{" "}
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
                              ${totalPrice}
                            </span>
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          Your personal data will be used to process your order,
                          support your experience throughout this website, and
                          for other purposes described in our privacy policy.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    type="submit"
                    className="btn btn-dark btn-modern w-100 text-uppercase bg-color-hover-primary border-color-hover-primary border-radius-0 text-3 py-3"
                  >
                    Place Order <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
