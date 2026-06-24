function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-3">CampusKart</h2>
        <p className="text-gray-400">
          Buy and Sell products easily within your campus.
        </p>

        <div className="mt-5 flex justify-center gap-6">
          <a href="#">Home</a>
          <a href="#">Buy</a>
          <a href="#">Sell</a>
          <a href="#">Contact</a>
        </div>

        <p className="text-gray-500 mt-6">
          © 2026 CampusKart. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;