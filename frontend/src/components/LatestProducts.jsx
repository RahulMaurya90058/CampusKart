import { useEffect, useState } from "react";
import API from "../api/api";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";

function LatestProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await API.get("/products");

      setProducts(res.data.products.slice(0, 6));

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h2 className="text-4xl font-bold">

              Latest Products

            </h2>

            <p className="text-gray-500 mt-2">

              Explore recently added products.

            </p>

          </div>

        </div>

        {loading && <LoadingSkeleton />}

        {!loading && (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
                wishlist={[]}
                handleWishlist={() => {}}
              />

            ))}

          </div>

        )}

      </div>

    </section>

  );

}

export default LatestProducts;