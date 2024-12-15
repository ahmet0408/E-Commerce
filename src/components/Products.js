import React, { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import Pagination from "./Pagination.js";
import { UserContext } from "../context/UserDetails.js";
import { LanguageContext, Words } from "../context/Language.js";
import { apiUrl } from "../env.js";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const parent = searchParams.get("parent");
  const brand = searchParams.get("brand");
  const { id } = useParams();
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState({});
  const [head, setHead] = useState("");
  const [product, setProduct] = useState([]);
  const [data, setData] = useState(0);
  const { handleUrl } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const handleSelect = (e) => {
    setData(e.target.value);
  };
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
        if (parent == "disc") {
          setProduct(actualData.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    handleUrl(window.location.href);
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
        if (parent == "stock") {
          setProduct(actualData.data);
        }
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
        if (parent == "new") {
          setProduct(actualData.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    const controller = new AbortController(); // <-- create controller
    if (!brand || !id) {
      return () => controller.abort();
    }
    fetch(
      apiUrl +
        `/api/Productapi/GetAllProductWithBrandId/` +
        id +
        "?brand=" +
        brand,
      {
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        if (id > 0 && brand > 0) {
          setProduct(actualData.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetch(apiUrl + `/api/Productapi/GetBrandWithId/` + brand, {
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
        if (id > 0 && brand > 0) {
          setBrandName(actualData.name);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    handleUrl(window.location.href);
  }, [brand]);
  useEffect(() => {
    const controller = new AbortController(); // <-- create controller
    if (!id) {
      return () => controller.abort();
    }
    fetch(apiUrl + `/api/Productapi/GetCategoryWithId/` + id, {
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
        setCategory(actualData);
        setHead(
          actualData.parentParentId == null
            ? actualData.id
            : actualData.parentParentId
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  useEffect(() => {
    const controller = new AbortController(); // <-- create controller
    if (!id || brand) {
      return () => controller.abort();
    }
    fetch(apiUrl + `/api/productapi/getallproductwithcategoryid/` + id, {
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
  }, [id]);
  return (
    <div className="col-lg-9 order-1 order-lg-2">
      <div className="row mt-2" style={{ marginBottom: "10px" }}>
        <div className="d-flex justify-content-between flex-wrap col-md-12 align-self-center order-1">
          <ul className="breadcrumb d-block text-start">
            <li>
              <Link className="text-decoration-none" to="/">
                {Words[language].Home}
              </Link>
            </li>
            {parent == "new" && (
              <li className="active">{Words[language].New}</li>
            )}
            {parent == "stock" && (
              <li className="active">{Words[language].Stock}</li>
            )}
            {parent == "disc" && (
              <li className="active">{Words[language].Disc}</li>
            )}
            {brand != null && (
              <>
                <li>
                  <Link className="text-decoration-none" to="/brands">
                    {Words[language].Brands}
                  </Link>
                </li>
                <li className="active">{category.parentParentCategory}</li>
                <li className="active">{brandName}</li>
              </>
            )}
            {brand == null &&
              parent != "new" &&
              parent != "disc" &&
              parent != "stock" && (
                <li>
                  <Link
                    className="text-decoration-none"
                    to={"/products/" + head}
                  >
                    {category.parentParentCategory}
                  </Link>
                </li>
              )}
            {category.parentCategory != null &&
            category.name != null &&
            brand == null ? (
              <>
                <li>
                  <Link
                    className="text-decoration-none"
                    to={"/products/" + category.parentId}
                  >
                    {category.parentCategory}
                  </Link>
                </li>
                <li className="active">{category.name}</li>
              </>
            ) : category.name != category.parentParentCategory &&
              brand == null ? (
              <li className="active">{category.name}</li>
            ) : null}
          </ul>
          <select
            id="select"
            name="select"
            onChange={handleSelect}
            className="form-select form-control border-color-primary form-select-sm"
            style={{ width: "175px", lineHeight: "1.25", paddingRight: "4px" }}
          >
            <option value="0">{Words[language].None}</option>
            <option value="1">{Words[language].None1}</option>
            <option value="2">{Words[language].None2}</option>
          </select>
        </div>
      </div>
      {product.length > 0 && <Pagination productList={product} sort={data} />}
    </div>
  );
};

export default Products;
