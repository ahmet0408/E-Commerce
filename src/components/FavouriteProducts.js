import { useContext, useEffect } from "react";
import { FavouriContext } from "../context/Favouri";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { LanguageContext, Words } from "../context/Language";
import { UserContext } from "../context/UserDetails";

const FavouriteProducts = () => {
  const { favouriItems } = useContext(FavouriContext);
  const { language } = useContext(LanguageContext);
  const { handleUrl } = useContext(UserContext);
  useEffect(() => {
    handleUrl(window.location.href);
  }, []);

  return (
    <div className="col-lg-9 order-1 order-lg-2">
      <h5
        className="nav-item mt-2 font-weight-bold mb-3"
        style={{ color: "#0088CC", fontSize: "15px" }}
      >
        {Words[language].Wish}{" "}
      </h5>
      {favouriItems.length > 0 && <Pagination productList={favouriItems} />}
    </div>
  );
};

export default FavouriteProducts;
