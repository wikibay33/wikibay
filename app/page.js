import Image from "next/image";
import Hero from "../components/hero/Hero";
import HomePageCategories from "@/components/homePageCategories/HomePageCategories";
import BlogsHome from "@/components/blogs/BlogsHome";
// import { AnimatedPinDemo } from "@/components/homeCategories/HomePageCategories";

export default function Home() {
  return (
   <>
      <Hero />
      <HomePageCategories/>
      <BlogsHome />
   </>
  );
}
