import React from "react";

type CategoriesProps = {
  selectCategory: number;
  setSelectCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  selectCategory,
  setSelectCategory,
}) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => setSelectCategory(index)}
              className={selectCategory === index ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
