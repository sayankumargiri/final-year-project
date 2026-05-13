import { useEffect, useState } from "react";
import axios from "../api/axios";

import AdminProductCard
from "../components/AdminProductCard";


export default function AdminDashboard(){

  const [products,setProducts] =
    useState([]);


  useEffect(()=>{

    fetchProducts();

  },[]);


  const fetchProducts =
  async()=>{

    const res =
      await axios.get("/products");

    setProducts(
      res.data
    );

  };


  const handleDelete =
  async(id)=>{

    const token =
      localStorage.getItem("token");

    await axios.delete(

      `/products/${id}`,

      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }

    );

    fetchProducts();

  };


  const handleEdit =
  (product)=>{

    console.log(
      "edit:",
      product
    );

  };


  return(

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">

        Admin Dashboard

      </h1>


      <div className="grid md:grid-cols-3 gap-8">

        {
          products.map(product=>(

            <AdminProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          ))
        }

      </div>

    </div>

  );

}