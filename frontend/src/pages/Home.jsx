import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import LatestProducts from "../components/LatestProducts";
import WhyCampusKart from "../components/WhyCampusKart";
import AboutPreview from "../components/AboutPreview";
import CallToAction from "../components/CallToAction";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <LatestProducts />
      <WhyCampusKart />
      <AboutPreview />
      <Features />
      <CallToAction />
      <Footer />
    </>
  );
}

export default Home;