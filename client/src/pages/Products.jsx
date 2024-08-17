import "./Products.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";

/* 
1. product page component inside which all products are rendered.
2. here user can see all products available where each product's name, price and image can be seen
3. user can search for particular product by typing name in input search bar also they can sort the products based on their price
4. user can navigate to cart page on click of button to see which items they have added to cart.
*/

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.slice(0, 10)));
  }, [name]);

  const filteredProductList = allProducts?.filter((product) => {
    return product.title.toLowerCase().includes(name.trim().toLowerCase());
  });

  const handleChange = (e) => {
    if (e.target.id == "sort") {
      if (e.target.value === "price-desc") {
        const sortArray = [...allProducts];
        const sortedArray = sortArray.sort((a, b) => b.price - a.price);
        setAllProducts(sortedArray);
      }
      if (e.target.value === "price-asc") {
        const sortArray = [...allProducts];
        const sortedArray = sortArray.sort((a, b) => a.price - b.price);
        setAllProducts(sortedArray);
      }
    }
  };

  return (
    <>
      <h1 className="heading-text">All Products</h1>

      <div className="filter-container">
        <input
          onChange={(e) => setName(e.target.value)}
          className="input-field-style"
          type="text"
          placeholder="search by product name..."
        />

        <select onChange={handleChange} id="sort" className="select-style" defaultValue={"no-sort"}>
          <option value="no-sort">Select Sort Type</option>
          <option value="price-desc">Price - High to Low</option>
          <option value="price-asc">Price - Low to High</option>
        </select>
      </div>
      {filteredProductList.length == 0 && <p className="product-not-found">No Product Found</p>}
      <div className="parent-grid">
        {filteredProductList.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
      {filteredProductList.length > 0 && (
        <div className="btns-container">
          <button className="cart-btn-style" onClick={() => navigate("/cart")}>
            GO TO CART
          </button>
        </div>
      )}
    </>
  );
};

export default Products;
