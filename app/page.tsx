import Image from "next/image";
import Navbar from '../components/Navbar';
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import ServiceSlider from "../components/ServiceSlider";
import ServiceTable from "../components/ServiceTable";
import Skills from "../components/Skills";
import Gallery from "@/components/Gallery";
import Personals from "@/components/Personal";
import Brands from "@/components/Brands";
import Comments from "@/components/CommentSlider";
import ContactForm from "@/components/ContactForm";
import Rezervation from "@/components/Rezervation";
import PriceList from "@/components/PriceList";
import News from "@/components/News";
import Store  from "@/components/Store";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
    <Navbar />
    <Hero />
    <Intro />
    <ServiceSlider />
    <ServiceTable />
    <Skills />
    <Gallery />
    <Personals />
    <Brands/>
    <Comments/>
    <ContactForm />
    <Rezervation />
    <PriceList />
    <News />
    <Store/>
    <Footer />


    </div>
  );
}
