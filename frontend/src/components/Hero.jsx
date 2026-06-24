function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-6xl font-bold text-gray-800 mb-6">
        Buy & Sell Products with CampusKart
      </h1>

      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        A trusted marketplace for students to buy and sell books, gadgets,
        laptops, cycles, and much more.
      </p>

      <div className="flex gap-6">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700">
          Buy Now
        </button>

        <button className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700">
          Sell Product
        </button>
      </div>
    </section>
  );
}

export default Hero;