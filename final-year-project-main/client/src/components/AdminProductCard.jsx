import {
  Pencil,
  Trash2,
  Package,
  IndianRupee
} from "lucide-react";


export default function AdminProductCard({

  product,
  onEdit,
  onDelete

}) {

  return (

    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all">

      {/* Product Image */}
      <figure className="relative">

        <img
          src={product.image}
          alt={product.title}
          className="h-56 w-full object-cover"
        />


        <div className="badge badge-primary absolute top-3 right-3">

          In Stock : {product.stock}

        </div>

      </figure>


      {/* Product Details */}
      <div className="card-body">

        <h2 className="card-title text-lg">

          <Package size={18} />

          {product.title}

        </h2>


        <p className="text-base-content/70 line-clamp-2">

          {product.description}

        </p>


        <div className="flex items-center mt-2 text-lg font-bold">

          <IndianRupee size={18} />

          {product.price}

        </div>


        {/* Buttons */}
        <div className="card-actions justify-end mt-4">

          <button
            onClick={() => onEdit(product)}
            className="btn btn-info btn-sm"
          >

            <Pencil size={16} />

            Edit

          </button>


          <button
            onClick={() => onDelete(product._id)}
            className="btn btn-error btn-sm"
          >

            <Trash2 size={16} />

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}