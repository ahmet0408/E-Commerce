import { useEffect, createContext, useState } from "react";
import PropTypes from "prop-types";

export const FavouriContext = createContext();

export const FavouriProvider = ({ children }) => {
  const [favouriItems, setFavouriItems] = useState(
    localStorage.getItem("favouriProducts")
      ? JSON.parse(localStorage.getItem("favouriProducts"))
      : []
  );

  const addToFavouri = (item) => {
    const isItemInFavouri = favouriItems.find(
      (favouriItem) => favouriItem.id === item.id
    );

    if (isItemInFavouri) {
      setFavouriItems([...favouriItems]);
    } else {
      setFavouriItems([...favouriItems, { ...item }]);
    }
  };

  const isFavouri = (item) => {
    const isItemInFavouri = favouriItems.find(
      (favouriItem) => favouriItem.id === item.id
    );
    if (isItemInFavouri) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromFavouri = (item) => {
    const isItemInCart = favouriItems.find(
      (favouriItem) => favouriItem.id === item.id
    );

    if (isItemInCart) {
      setFavouriItems(
        favouriItems.filter((favouriItem) => favouriItem.id !== item.id)
      );
    } else {
      setFavouriItems([...favouriItems]);
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("favouriProducts");
    if (data) {
      setFavouriItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favouriProducts", JSON.stringify(favouriItems));
  }, [favouriItems]);

  return (
    <FavouriContext.Provider
      value={{ favouriItems, addToFavouri, removeFromFavouri, isFavouri }}
    >
      {children}
    </FavouriContext.Provider>
  );
};

FavouriProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
