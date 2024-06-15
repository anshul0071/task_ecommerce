import {
  CLEAR_FILTERS,
  UPDATE_FILTERS,
  UPDATE_SORT,
  FILTER_PRODUCTS,
  SORT_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_PAGE
} from "./actions";

export const loadProducts = (payload) => ({ type: LOAD_PRODUCTS, payload });

export const updateFilters = (e) => {
  let name = e.target.name;
  let value = e.target.value;
  if (name === "category") {
    value = e.target.dataset.category;
  }
  if (name === "price") {
    value = Number(value);
  }
  return { type: UPDATE_FILTERS, payload: { name, value } };
};

export const filterProducts = () => ({ type: FILTER_PRODUCTS });

export const clearFilters = () => ({ type: CLEAR_FILTERS });


export const updateSort = (e) => {
  const value = e.target.value;
  return { type: UPDATE_SORT, payload: value };
};

export const sortProducts = () => ({ type: SORT_PRODUCTS });

export const updatePage = (page) => ({ type: UPDATE_PAGE, payload: page });
