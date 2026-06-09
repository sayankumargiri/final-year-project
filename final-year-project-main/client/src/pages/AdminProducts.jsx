import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import Navbar from "../components/Navbar";

import api from "../api/axios";

import { toast } from "react-hot-toast";



export default function AddProduct() {

  const navigate =
    useNavigate();


  const { id } =
    useParams();


  const isEditMode =
    Boolean(id);




  const { token } =
    useSelector(
      (state) =>
        state.auth
    );






  const [name, setName] =
    useState("");


  const [price, setPrice] =
    useState("");


  const [category, setCategory] =
    useState("");


  const [description, setDescription] =
    useState("");


  const [stock, setStock] =
    useState("");


  const [image, setImage] =
    useState(null);


  const [preview, setPreview] =
    useState("");








  useEffect(() => {

    const fetchProduct =
      async () => {

        if (!isEditMode) {

          return;

        }



        try {

          const { data } =
            await api.get(
              `/products/${id}`
            );



          const product =
            data.product || data;




          setName(
            product.name || ""
          );


          setPrice(
            product.price || ""
          );


          setCategory(
            product.category || ""
          );


          setDescription(
            product.description || ""
          );


          setStock(
            product.stock || ""
          );




          if (product.image) {

            setPreview(

              product.image.startsWith(
                "http"
              )

                ? product.image

                : `http://localhost:5000${product.image}`

            );

          }

        }

        catch (error) {

          console.log(error);

          toast.error(
            "Failed to load product"
          );

        }

      };




    fetchProduct();

  }, [
    id,
    isEditMode,
  ]);








  const handleImage =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) {

        return;

      }



      setImage(
        file
      );



      setPreview(

        URL.createObjectURL(
          file
        )

      );

    };








  const handleSubmit =
    async (e) => {

      e.preventDefault();




      if (

        !name ||

        !price ||

        !category ||

        !stock ||

        !description

      ) {

        toast.error(
          "All fields are required"
        );

        return;

      }






      try {

        const formData =
          new FormData();




        formData.append(
          "name",
          name
        );


        formData.append(
          "price",
          price
        );


        formData.append(
          "category",
          category
        );


        formData.append(
          "description",
          description
        );


        formData.append(
          "stock",
          stock
        );




        if (image) {

          formData.append(
            "image",
            image
          );

        }







        if (isEditMode) {

          await api.put(

            `/products/${id}`,

            formData,

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );



          toast.success(
            "Product updated successfully"
          );

        }



        else {

          await api.post(

            "/products",

            formData,

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );



          toast.success(
            "Product added successfully"
          );

        }







        navigate(
          "/admin/products"
        );

      }

      catch (error) {

        console.log(error);

        toast.error(
          "Operation failed"
        );

      }

    };









  return (

    <div className="min-h-screen bg-base-200">

      <Navbar />



      <div className="max-w-5xl mx-auto p-6">

        <div
          className="
          bg-base-100
          shadow-xl
          rounded-2xl
          p-8
        "
        >

          <h1
            className="
            text-3xl
            font-bold
            mb-6
          "
          >

            {

              isEditMode

                ? "Edit Product"

                : "Add Product"

            }

          </h1>








          <form
            onSubmit={
              handleSubmit
            }
            className="
            grid
            gap-5
          "
          >




            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Product Name"
              className="
              input
              input-bordered
            "
            />





            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              placeholder="Price"
              className="
              input
              input-bordered
            "
            />





            <input
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              placeholder="Category"
              className="
              input
              input-bordered
            "
            />





            <input
              type="number"
              value={stock}
              onChange={(e) =>
                setStock(
                  e.target.value
                )
              }
              placeholder="Stock"
              className="
              input
              input-bordered
            "
            />






            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Description"
              className="
              textarea
              textarea-bordered
            "
            />







            <input
              type="file"
              accept="image/*"
              onChange={
                handleImage
              }
              className="
              file-input
              file-input-bordered
            "
            />








            {

              preview && (

                <img
                  src={preview}
                  alt="preview"
                  className="
                  w-40
                  h-40
                  object-cover
                  rounded-xl
                "
                />

              )

            }








            <button
              type="submit"
              className="
              btn
              btn-success
            "
            >

              {

                isEditMode

                  ? "Update Product"

                  : "Add Product"

              }

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}