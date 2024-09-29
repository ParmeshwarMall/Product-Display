import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    "No selected category"
  );
  const [slug, setSlug] = useState("");

  const [search, setSearch] = useState("");

  const fetchData = async (slug) => {
    let url = "https://dummyjson.com/products";
    if (slug != "") {
      url = `https://dummyjson.com/products/category/${slug}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchData(slug);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  }, []);

  // console.log(categories)
  //   console.log(products)
  console.log(search)

  const ProductCard = ({ product }) => {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={product.thumbnail}
          className="card-img-top"
          alt={product.title}
        />
        <hr />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Brand: {product.brand}</li>
          <li className="list-group-item">Price: ${product.price}</li>
          <li className="list-group-item">Stock: {product.stock} available</li>
        </ul>
      </div>
    );
  };

  const click = (category) => {
    setSelectedCategory(category.name);
    fetchData(category.slug);
  };

  const Category = ({ category }) => {
    return (
      <button className="button" onClick={() => click(category)}>
        {category.name}
      </button>
    );
  };

  const filteredProduct=products.filter((product)=>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="main-body">
      <div className="category">
        {categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>

      <div className="main-card-body">
        <h2>{`Selected category: ${selectedCategory}`}</h2>
        <div class="mb-3 ">
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Search product by name"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="card-body">
          {filteredProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
