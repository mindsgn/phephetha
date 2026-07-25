import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { PromotionsSection } from "@/components/home/promotions-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { BrandsSection } from "@/components/home/brands-section"
import { ContactSection } from "@/components/home/contact-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedProducts />
      <PromotionsSection />
      <TestimonialsSection />
      <BrandsSection />
      <ContactSection />
    </>
  )
}
