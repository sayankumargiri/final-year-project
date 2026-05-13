import {
  useEffect,
  useState
} from "react";

import api
  from "../api/axios";


export default function Filters({

  selectedCategory,

  setSelectedCategory

}) {

  const [
    categories,

    setCategories

  ] = useState([]);




  useEffect(() => {

    const fetchCategories =
      async () => {

        try {

          const res =
            await api.get(
              "/products/categories/all"
            );


          console.log(
            "Fetched:",
            res.data
          );


          setCategories(
            Array.isArray(
              res.data
            )
              ? res.data
              : []
          );

        } catch (error) {

          console.log(
            error
          );
        }
      };


    fetchCategories();

  }, []);





  return (

    <select

      className=
      "select select-bordered w-full"

      value={
        selectedCategory
      }

      onChange={(e)=>

        setSelectedCategory(
          e.target.value
        )
      }
    >

      <option value="">
        All Categories
      </option>


      {

        categories.map(

          (category) => (

            <option

              key={
                category
              }

              value={
                category
              }
            >

              {category}

            </option>
          )
        )
      }

    </select>
  );
}