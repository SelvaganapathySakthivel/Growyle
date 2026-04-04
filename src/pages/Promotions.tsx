import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandCard from "@/components/BrandCard";

const filterTabs = ["All", "Clothing", "Shoes", "Beauty & Wellness", "Travel & Vacations", "Home & Garden", "Electronics"];

const extraCashBackStores = [
  { name: "Macy's", cashback: "16% Cash Back", prev: "was 2%", logo: "M★" },
  { name: "Sam's Club", cashback: "Up to 18% Cash Back", prev: "was 4%", logo: "SC" },
  { name: "TEMU", cashback: "22% Cash Back", prev: "was 3%", logo: "T" },
  { name: "Zoro", cashback: "14% Cash Back", prev: "was 2%", logo: "Z" },
  { name: "TurboTax", cashback: "20% Cash Back", prev: "was 5%", logo: "TT" },
  { name: "adidas", cashback: "4% Cash Back", prev: "was 2%", logo: "Ad" },
  { name: "StubHub", cashback: "4% Cash Back", prev: "was 2%", logo: "SH" },
  { name: "American Eagle", cashback: "14% Cash Back", prev: "was 2%", logo: "AE" },
  { name: "Under Armour", cashback: "18% Cash Back", prev: "was 2%", logo: "UA" },
  { name: "kate spade", cashback: "20% Cash Back", prev: "was 2%", logo: "KS" },
  { name: "Cole Haan", cashback: "18% Cash Back", prev: "was 2%", logo: "CH" },
  { name: "NordVPN", cashback: "105% Cash Back", prev: "was 20%", logo: "NV" },
];

const beautyDeals = [
  { name: "MERIT", cashback: "14% Cash Back", prev: "was 2%", logo: "Me", desc: "The Signature Bag — ships free with every first order" },
  { name: "Moroccanoil", cashback: "17% Cash Back", prev: "was 3.5%", logo: "Mo", desc: "Glow all out with our new Shimmering Oil" },
  { name: "Lume", cashback: "20% Cash Back", prev: "was 5%", logo: "Lu", desc: "Build your own bundle and save up to 30%." },
  { name: "Quay Australia", cashback: "20% Cash Back", prev: "was 5%", logo: "Q", desc: "Take 30% off sitewide." },
  { name: "GNC", cashback: "14% Cash Back", prev: "was 2%", logo: "GN", desc: "Buy One, Get One 50% Off GNC Brand Vitamins" },
];

const allStores = [
  { name: "Macy's", cashback: "16% Cash Back", prev: "was 2%", logo: "M★" },
  { name: "Sam's Club", cashback: "Up to 18% Cash Back", prev: "was 4%", logo: "SC" },
  { name: "TEMU", cashback: "22% Cash Back", prev: "was 3%", logo: "T" },
  { name: "Zoro", cashback: "14% Cash Back", prev: "was 2%", logo: "Z" },
  { name: "TurboTax", cashback: "20% Cash Back", prev: "was 5%", logo: "TT" },
  { name: "adidas", cashback: "4% Cash Back", prev: "was 2%", logo: "Ad" },
  { name: "Under Armour", cashback: "18% Cash Back", prev: "was 2%", logo: "UA" },
  { name: "NordVPN", cashback: "105% Cash Back", prev: "was 20%", logo: "NV" },
];

export default function PromotionsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn variant="dashboard" />

      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Extra Cash Back for a limited time</h2>
          <Link to="#" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {extraCashBackStores.map(store => (
            <BrandCard key={store.name} name={store.name} cashback={store.cashback} previousRate={store.prev} logo={store.logo} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Extra Cash Back on beauty and wellness</h2>
          <Link to="#" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {beautyDeals.map(deal => (
            <BrandCard key={deal.name} variant="deal" name={deal.name} cashback={deal.cashback} previousRate={deal.prev} logo={deal.logo} description={deal.desc} actionLabel="Shop" />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-8 pb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">All stores with Extra Cash Back</h2>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allStores.map(store => (
            <BrandCard key={store.name + "all"} name={store.name} cashback={store.cashback} previousRate={store.prev} logo={store.logo} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
