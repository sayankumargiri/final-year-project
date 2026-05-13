import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../api/axios";

import {
  toast,
} from "react-hot-toast";



export default function AddProduct() {


  const navigate =
    useNavigate();


  const { id } =
    useParams();


  const isEditMode =
    Boolean(id);





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


  const [loading, setLoading] =
    useState(false);








  useEffect(() => {

    if (isEditMode) {

      fetchProduct();

    }

  }, [id]);








  const fetchProduct =
    async () => {

      try {

        setLoading(true);



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

          const imageUrl =

            product.image.startsWith(
              "http"
            )

              ? product.image

              : `http://localhost:5000${product.image}`;



          setPreview(
            imageUrl
          );

        }

      }

      catch (error) {

        console.log(error);

        toast.error(
          "Failed to load product"
        );

      }

      finally {

        setLoading(false);

      }

    };








  const handleImage =
    (e) => {

      const file =

        e.target.files[0];



      if (!file) return;




      setImage(
        file
      );



      const imageUrl =

        URL.createObjectURL(
          file
        );



      setPreview(
        imageUrl
      );

    };








  const handleSubmit =
    async (e) => {

      e.preventDefault();



      try {

        setLoading(true);




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

            formData

          );



          toast.success(

            "Product updated successfully"

          );

        }

        else {

          await api.post(

            "/products",

            formData

          );



          toast.success(

            "Product added successfully"

          );

        }






        navigate("/");

      }

      catch (error) {

        console.log(error);




        toast.error(

          error?.response?.data?.message ||

          "Operation Failed"

        );

      }

      finally {

        setLoading(false);

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
            className="grid gap-5"
          >




            <input
              required
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="
              input
              input-bordered
            "
              placeholder="Name"
            />






            <input
              required
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              className="
              input
              input-bordered
            "
              placeholder="Price"
            />







            <input
              required
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="
              input
              input-bordered
            "
              placeholder="Category"
            />








            <input
              required
              type="number"
              value={stock}
              onChange={(e) =>
                setStock(
                  e.target.value
                )
              }
              className="
              input
              input-bordered
            "
              placeholder="Stock"
            />








            <textarea
              required
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
              textarea
              textarea-bordered
            "
              placeholder="Description"
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
                  rounded-xl
                  object-cover
                "
                />

              )

            }








            <button
              disabled={loading}
              className="
              btn
              btn-success
            "
            >

              {

                loading

                  ? "Please wait..."

                  : isEditMode

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