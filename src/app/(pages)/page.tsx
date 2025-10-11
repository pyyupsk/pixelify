import { Cta } from "@/components/section/home/cta";
import { Features } from "@/components/section/home/features";
import { Hero } from "@/components/section/home/hero";
import { HowItWorks } from "@/components/section/home/how-it-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Cta />
    </>
  );
}
