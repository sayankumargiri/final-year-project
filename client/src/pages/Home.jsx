import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  Plus,
  RefreshCw,
  Shield,
} from "lucide-react";

import {
  setProducts,
  setLoading,
} from "../redux/slices/productSlice";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import { toast } from "react-hot-toast";



export default function Home() {


  const dispatch =
    useDispatch();


  const navigate =
    useNavigate();




  const {

    products = [],

    loading,

  } = useSelector(

    (state) =>
      state.products

  );




  const {

    user,

    token,

  } = useSelector(

    (state) =>
      state.auth

  );





  const [

    search,

    setSearch

  ] = useState("");




  const [

    selectedCategory,

    setSelectedCategory

  ] = useState("");






  useEffect(() => {

    fetchProducts();

  }, []);








  const fetchProducts =

    async () => {

      try {

        dispatch(
          setLoading(true)
        );



        const res =

          await api.get(
            "/products"
          );




        const productData =

          Array.isArray(
            res.data
          )

            ? res.data

            : res.data?.products || [];




        dispatch(

          setProducts(
            productData
          )

        );

      }

      catch (error) {

        console.log(
          error
        );

        toast.error(
          "Failed to load products"
        );

      }

      finally {

        dispatch(

          setLoading(
            false
          )

        );

      }

    };








  const handleDelete =

    async (id) => {


      const confirmDelete =

        window.confirm(
          "Are you sure you want to delete this?"
        );



      if (!confirmDelete) {

        return;

      }



      try {

        await api.delete(

          `/products/${id}`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );



        dispatch(

          setProducts(

            products.filter(

              (item) =>

                item._id !== id

            )

          )

        );



        toast.success(
          "Product deleted successfully"
        );

      }

      catch (error) {

        console.log(
          error
        );

        toast.error(
          "Delete failed"
        );

      }

    };








  const filteredProducts =

    products.filter(

      (product) => {



        const searchMatch =

          product?.name
            ?.toLowerCase()

            .includes(

              search
                .toLowerCase()

            );




        const categoryMatch =

          !selectedCategory ||

          product?.category
            ?.toLowerCase()

          ===

          selectedCategory
            ?.toLowerCase();





        return (

          searchMatch &&

          categoryMatch

        );

      }

    );








  if (loading) {

    return <Loader />;

  }






  return (

    <div className="min-h-screen bg-base-200">

      <Navbar />



      <div className="max-w-7xl mx-auto p-6">




        <div
          className="
          bg-base-100
          rounded-2xl
          shadow-lg
          p-6
        "
        >

          <div className="flex gap-3 items-center">

            <Shield size={28} />

            <div>

              <h1
                className="
                text-3xl
                font-bold
              "
              >

                Welcome {user?.name}

              </h1>


              <p className="opacity-70">

                Role : {user?.role}

              </p>

            </div>

          </div>






          {
            user?.role ===
            "admin" && (

              <div
                className="
                flex
                flex-wrap
                gap-4
                mt-6
              "
              >


                <button

                  type="button"

                  onClick={() =>

                    navigate(
                      "/admin/add-product"
                    )

                  }

                  className="
                  btn
                  btn-success
                "
                >

                  <Plus size={18} />

                  Add Product

                </button>





                <button

                  type="button"

                  onClick={
                    fetchProducts
                  }

                  className="
                  btn
                  btn-info
                "
                >

                  <RefreshCw
                    size={18}
                  />

                  Refresh

                </button>

              </div>

            )
          }

        </div>








        <div
          className="
          mt-6
          flex
          flex-col
          md:flex-row
          gap-4
        "
        >

          <SearchBar
            search={search}
            setSearch={setSearch}
          />



          <Filters
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }
          />

        </div>








        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-5
          mt-8
        "
        >

          {

            filteredProducts
              .length > 0

              ? (

                filteredProducts.map(

                  (
                    product
                  ) => (

                    <ProductCard

                      key={
                        product._id
                      }

                      product={
                        product
                      }

                      isAdmin={
                        user?.role === "admin"
                      }

                      onEdit={() =>

                        navigate(

                          `/admin/edit-product/${product._id}`

                        )

                      }

                      onDelete={() =>

                        handleDelete(
                          product._id
                        )

                      }

                    />

                  )

                )

              )

              : (

                <div
                  className="
                  col-span-full
                  text-center
                  text-xl
                  font-semibold
                "
                >

                  No Products Found

                </div>

              )

          }

        </div>

      </div>

    </div>

  );

}