import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    /* This main wrapper ensures the bright, airy theme throughout the page */
    <main className="relative min-h-screen bg-white overflow-hidden">
      
      {/* Background Decorative Gradients - Subtle "glows" for the bright theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-blue-50 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-indigo-50 blur-[100px] rounded-full -z-10" />

      {/* Landing Page Components */}
      <Navbar />
      
      <div className="relative z-10">
        <Hero />    
        <Features />
        
        {/* You can add a 'How it Works' or 'CTA' component here later */}
      </div>

    <Footer />
    </main>
  );
}