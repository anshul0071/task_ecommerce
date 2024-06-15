import produce from "immer";

import {
  CLEAR_FILTERS,
  UPDATE_FILTERS,
  UPDATE_SORT,
  FILTER_PRODUCTS,
  SORT_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_PAGE
} from "./actions";

const initialState = {
  products: [],
  filtered_products: [],
  products_loading: false,
  products_error: false,
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
  // Pagination state
  current_page: 1,
  products_per_page: 10,
};

const filterReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    let tempProducts;

    switch (action.type) {
      case LOAD_PRODUCTS:
        let maxPrice = action.payload.map((product) => product.price);
        maxPrice = Math.max(...maxPrice);

        draft.all_products = action.payload;
        draft.filtered_products = action.payload;
        draft.filters.max_price = maxPrice;
        draft.filters.price = maxPrice;
        break;

      case UPDATE_SORT:
        draft.sort = action.payload;
        break;

      case SORT_PRODUCTS:
        const { sort } = draft;
        tempProducts = [...draft.filtered_products];
        if (sort === "price-lowest") {
          tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        }
        if (sort === "price-highest") {
          tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        }
        if (sort === "name-a") {
          tempProducts = tempProducts.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        }
        if (sort === "name-z") {
          tempProducts = tempProducts.sort((a, b) =>
            b.title.localeCompare(a.title)
          );
        }
        draft.filtered_products = tempProducts;
        break;

      case UPDATE_FILTERS:
        draft.filters[action.payload.name] = action.payload.value;
        break;

      case FILTER_PRODUCTS:
        const { text, category, price } = draft.filters;
        tempProducts = [...draft.all_products];
        if (text) {
          tempProducts = tempProducts.filter((product) =>
            product.title.toLowerCase().includes(text)
          );
        }

        if (category !== "all") {
          tempProducts = tempProducts.filter(
            (product) => product.category === category
          );
        }

        tempProducts = tempProducts.filter((product) => product.price <= price);
        draft.filtered_products = tempProducts;
        break;

      case CLEAR_FILTERS:
        draft.filters.text = "";
        draft.filters.category = "all";
        draft.filters.price = draft.filters.max_price;
        break;
        case UPDATE_PAGE:
          return {
            ...state,
            current_page: action.payload,
          };

      default:
        return state
        break;
    }
  });

export default filterReducer;
