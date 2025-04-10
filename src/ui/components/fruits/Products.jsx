import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../api/categoryApi';
import { getProducts } from '../../../api/productApi';
import { useCart } from "@/contexts/CartContext"; // 경로는 프로젝트 구조에 맞게 수정

const Products = () => {
  
  const { addToCart } = useCart();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [products, setProducts] = useState([]);


  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log(res.data)
        setCategories(res.data)
      })
      .catch((err) => console.error(err));
    
    //상품 불러오기
    getProducts()
      .then((res) => {
        console.log(res.data)
        setProducts(res.data)
      })
      .catch((err) => console.error(err));
  }, []);

  console.log("가자......")
  const filteredProducts =
    selectedCategory === "전체" ? products.filter((p) =>  p.image != null) : products.filter((p) => p.category.name == selectedCategory && p.image);

  return (
  <>
  {/* Fruits Shop Start*/}
  <div className="container-fluid fruite py-5">
    <div className="container py-5">
      <div className="tab-class text-center">
        <div className="row g-4">
          <div className="col-lg-4 text-start">
            <h1>Our Organic Products</h1>
          </div>
          <div className="col-lg-8 text-end">
            <ul className="nav nav-pills d-inline-flex text-center mb-5">
              <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory("전체");
                  }}  
                >
                  <span className="text-dark" style={{ width: 130 }}>
                    All Products
                  </span>
                </a>
              </li>
              {categories.map((category, index) => (
                <li className="nav-item"  key={index}>
                  <a
                    href="#"
                    className="d-flex py-2 m-2 bg-light rounded-pill"
                    data-bs-toggle="pill"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(category.name);
                      console.log(category.name)
                    }}                   
                  >
                  <span className="text-dark" style={{ width: 130 }}>
                    {category.name}
                  </span>
                  </a>
                </li>
              ))}


            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show p-0 active">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  {filteredProducts.map((product) => (
                    <div  key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                      <div className="rounded position-relative fruite-item">
                        <div className="fruite-img fruite-img ratio ratio-4x3 overflow-hidden rounded-top">
                          <img
                            src={`http://127.0.0.1:8000${product.image}`}
                            className="img-fluid w-100 rounded-top"
                            alt={product.name}
                          />
                        </div>
                        <div
                          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                          style={{ top: 10, left: 10 }}
                        >
                          {product.category.name}
                        </div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                          <h4>{product.name}</h4>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit sed do eiusmod te incididunt
                          </p>
                          <div className="d-flex flex-column justify-content-center align-items-center flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">
                              ${product.price} / kg
                            </p>
                            <button
                              onClick={() => addToCart(product)}              
                              className="btn border border-secondary rounded-pill px-3 text-primary"
                            >
                              <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  ))}                 
                </div>
              </div>
            </div>
          </div>

         
          
         
        </div>
      </div>
    </div>
  </div>
  {/* Fruits Shop End*/}
</>
  )
}

export default Products

