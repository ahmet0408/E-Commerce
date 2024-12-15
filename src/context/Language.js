import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "ru"
  );

  useEffect(() => {
    const data = localStorage.getItem("lang");
    if (data) {
      setLanguage(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const Words = {
  tk: {
    Categories: "Kategoriýalar",
    Brands: "Brendler",
    Wish: "Halanlarym",
    Home: "Baş sahypa",
    Stock: "Aksiýadaky harytlar",
    Disc: "Arzanladyşdaky harytlar",
    New: "Täze harytlar",
    None: "Hödürlenen tertipde",
    None1: "Arzandan gymmada",
    None2: "Gymmatdan arzana",
    Contact: "Habarlaşmak üçin",
    SearchProduct: "Harydy ady boýunça gözle...",
    Related: "Meňzeş",
    Products: "harytlar",
    Featured: "Maslahat berilýän harytlar",
  },
  ru: {
    Categories: "Каталог товаров",
    Brands: "Бренды",
    Wish: "Избранные",
    Home: "Главная Страница",
    Stock: "Продукция в категории Акции",
    Disc: "Товары со скидкой",
    New: "Новые продукты",
    None: "По умолчанию",
    None1: "По возрастанию цены",
    None2: "По убыванию цены",
    Contact: "Для Контакты",
    SearchProduct: "Поиск товара по названию...",
    Related: "Похожие",
    Products: "продукты",
    Featured: "Рекомендуемые продукты",
  },
  en: {
    Categories: "Categories",
    Brands: "Brands",
    Wish: "Favorites",
    Home: "Home",
    Stock: "Goods in stock",
    Disc: "Discounted products",
    New: "New Products",
    None: "All sorts of",
    None1: "Price low to hight",
    None2: "Price hight to low",
    Contact: "For Contacts",
    SearchProduct: "Search by product name...",
    Related: "Related",
    Products: "Products",
    Featured: "Featured products",
  },
};
