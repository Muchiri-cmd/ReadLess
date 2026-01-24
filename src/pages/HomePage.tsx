
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Workings from '../components/Workings';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
    <Navbar/>

    <Hero  />

    <Features />

    <Workings />

    <CallToAction />

    <Footer />

     
    </div>
  );
};

export default HomePage;