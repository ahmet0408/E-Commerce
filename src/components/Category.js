import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../context/UserDetails";
import { useParams, Link } from "react-router-dom";
import { apiUrl } from "../env";

const Category = () => {
  const { id } = useParams();
  const [sub, setSub] = useState(null);
  const [child, setChild] = useState(null);
  const [head, setHead] = useState([]);
  const { handleUrl } = useContext(UserContext);
  useEffect(() => {
    fetch(apiUrl + `/api/productapi/GetCategoryWithId/` + id, {
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
        setHead(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch(apiUrl + `/api/productapi/subcategory/` + id, {
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
        setSub(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetch(apiUrl + `/api/productapi/childcategory/` + id, {
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
        setChild(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    handleUrl(window.location.href);
  }, [id]);

  return (
    <div className="col-lg-9 order-1 order-lg-2">
      <div
        className="row products product-thumb-info-list"
        data-plugin-options="{'layoutMode': 'fitRows'}"
      >
        <h4
          className="font-weight-bold mb-3 mt-2"
          style={{ marginLeft: "40px" }}
        >
          <Link
            className="nav-item text-decoration-none"
            to={"/products/" + head.id}
          >
            {head.name}{" "}
            <i style={{ fontSize: "15px" }} className="fas fa-arrow-right"></i>
          </Link>
        </h4>
        {sub &&
          sub.map((item) => (
            <div className="col-sm-6 col-lg-4" key={item.id}>
              <div className="feature-box feature-box-style-2">
                <div className="feature-box-icon pt-0">
                  <i className="icons icon-support text-color-primary"></i>
                </div>
                <div className="feature-box-info p-0">
                  <h5 className="font-weight-bold mb-2">
                    <Link
                      className="nav-item text-decoration-none"
                      style={{ fontSize: "14px" }}
                      to={"/products/" + item.id}
                    >
                      {item.name}
                    </Link>
                  </h5>

                  <ul className="p-0">
                    {child &&
                      child.map((itemm) =>
                        itemm.parentId != item.id ? null : (
                          <li style={{ listStyleType: "none" }} key={itemm.id}>
                            <Link
                              className="nav-item text-decoration-none"
                              to={"/products/" + itemm.id}
                            >
                              {itemm.name}
                            </Link>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
