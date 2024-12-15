import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserDetails.js";
import { apiUrl } from "../env.js";
import Pagination from "./Pagination.js";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState([]);
  const { handleUrl } = useContext(UserContext);
  const query = searchParams.get("q");
  useEffect(() => {
    const controller = new AbortController(); // <-- create controller
    if (query == "") {
      return () => controller.abort();
    }
    fetch(
      `${apiUrl}/api/productapi/getallproductwithsearch?q=${encodeURIComponent(
        query
      )}`,
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
        setProduct(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    handleUrl(window.location.href);
  }, [query]);
  return (
    <div className="col-lg-9 order-1 order-lg-2">
      {product.length != 0 ? (
        <Pagination productList={product} />
      ) : (
        <h1
          style={{
            color: "GrayText",
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
          }}
        >
          Haryt tapylmady!
        </h1>
      )}
    </div>
  );
};

export default SearchResult;
