function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What You Can Do
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Buy Products</h3>
            <p className="text-gray-600">
              Find books, laptops, mobiles and many more products from students.
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Sell Products</h3>
            <p className="text-gray-600">
              Sell your unused items easily within your campus community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;