import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCategory,
  currentPage,
  setFilters,
  resetFilters,
  selectCategory,
  FilterState,
} from "../redux/slice/Filters";
import { getPizzas, selectPizzaData } from "../redux/slice/PizzaSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, pagination, searchValue } =
    useSelector(selectCategory);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sort.sortProperty,
        searchValue,
        pagination,
      });
      navigation(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, pagination]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort } as FilterState));
      isSearch.current = true;
    }

    return () => {
      dispatch(resetFilters());
    };
  }, []);

  const fetchPizzas = async () => {
    dispatch(
      // @ts-ignore
      getPizzas({
        category,
        search,
        pagination,
        sort,
      }),
    );
  };

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    window.scrollTo(0, 0);
    isSearch.current = false;
  }, [categoryId, sort, searchValue, pagination]);

  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));
  const skeleton = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <div className="content__top">
        <Categories
          selectCategory={categoryId}
          setSelectCategory={(i: number) => dispatch(changeCategory(i))}
        />
        <Sort />
      </div>
      {status === "error" ? (
        <div className="container--cart">
          <div className="content__error-info  cart cart--empty">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить пиццы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === "loading" ? skeleton : pizzas}
          </div>
          <Pagination
            countPage={pagination}
            onChangePage={(number: number) => dispatch(currentPage(number))}
          />
        </div>
      )}
    </>
  );
};

export default Home;
