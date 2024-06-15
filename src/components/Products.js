import React, { useEffect } from "react";
import styled from "styled-components";
import { Loading, Error, GridProducts, Typography } from ".";
import { useSelector, useDispatch } from "react-redux";
import {
  filterProducts,
  loadProducts,
  sortProducts,
  updatePage,
} from "../redux/filter/filterAction";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid #4caf50;
  }

  &.active {
    background-color: #3e8e41;
  }
`;

const Products = () => {
  const dispatch = useDispatch();
  const {
    products_loading: loading,
    products_error: error,
    products,
  } = useSelector((state) => state.productsState);

  const {
    filtered_products,
    grid_view,
    sort,
    filters,
    current_page,
    products_per_page,
  } = useSelector((state) => state.filterState);
  useEffect(() => {
    dispatch(loadProducts(products));
  }, [products, dispatch]);

  useEffect(() => {
    dispatch(filterProducts());
    dispatch(sortProducts());
  }, [filters, sort, dispatch]);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  if (filtered_products.length < 1) {
    return (
      <Typography.H4>Sorry, no products matched your search...</Typography.H4>
    );
  }

  // Pagination logic
  const indexOfLastProduct = current_page * products_per_page;
  const indexOfFirstProduct = indexOfLastProduct - products_per_page;
  const currentProducts = filtered_products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filtered_products.length / products_per_page); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <GridProducts products={currentProducts} />
      <PaginationContainer>
        {pageNumbers.map((number) => (
          <PaginationButton
            key={number}
            className={""}
            onClick={() => {
              dispatch(updatePage(number))}}
          >
            {number}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </div>
  );
};

export default Products;
