import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategorySidebar from "@/components/CategorySidebar";
import BrandCard from "@/components/BrandCard";
import { Button } from "@/components/ui/button";

const storesByCategory: Record<string, Array<{ name: string; cashback: string; prev?: string }>> = {
  "Beauty & Wellness": [
    { name: "Macy's", cashback: "6% Cash Back", prev: "was 2%" },
    { name: "Target", cashback: "1% Cash Back" },
    { name: "Bloomingdale's", cashback: "2% Cash Back" },
    { name: "Nordstrom", cashback: "2% Cash Back" },
    { name: "Ulta Beauty", cashback: "2% Cash Back" },
  ],
  "Auto & Tires": [
    { name: "TEMU", cashback: "6% Cash Back", prev: "was 3%" },
    { name: "Zoro", cashback: "4% Cash Back", prev: "was 2%" },
    { name: "Tire Rack", cashback: "3% Cash Back" },
    { name: "Advance Auto Parts", cashback: "2% Cash Back" },
    { name: "Cabela's", cashback: "3% Cash Back" },
  ],
  "Clothing": [
    { name: "Macy's", cashback: "16% Cash Back", prev: "was 2%" },
    { name: "Old Navy", cashback: "12% Cash Back" },
    { name: "Nike", cashback: "6% Cash Back", prev: "was 2%" },
    { name: "Gap", cashback: "12% Cash Back" },
    { name: "H&M", cashback: "4% Cash Back" },
  ],
};

const featuredAd: Record<string, { brand: string; cashback: string; desc: string; image: string }> = {
  "Beauty & Wellness": { brand: "Armani beauty", cashback: "2% Cash Back", desc: "Discover the new Acqua Di Gio Intense + free mini.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=450&fit=crop" },
  "Auto & Tires": { brand: "RevZilla", cashback: "2% Cash Back", desc: "Seriously Limited Gear: Get Up to 60% off", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=450&fit=crop" },
  "Clothing": { brand: "Nike", cashback: "6% Cash Back", desc: "New arrivals in spring styles.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=450&fit=crop" },
};

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("Beauty & Wellness");
  const stores = storesByCategory[activeCategory] || storesByCategory["Beauty & Wellness"];
  const ad = featuredAd[activeCategory] || featuredAd["Beauty & Wellness"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="landing" />

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex">
          <CategorySidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          <div className="flex-1 flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{activeCategory}</h1>
              <div>
                {stores.map(store => (
                  <BrandCard
                    key={store.name}
                    variant="list"
                    name={store.name}
                    cashback={store.cashback}
                    previousRate={store.prev}
                    logo={store.name[0]}
                    actionLabel="Shop Now"
                  />
                ))}
              </div>
            </div>

            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-secondary rounded-xl overflow-hidden sticky top-20">
                <div className="aspect-[4/3] bg-muted">
                  <img src={ad.image} alt={ad.brand} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{ad.brand}</h3>
                  <p className="text-cashback text-sm font-semibold">{ad.cashback}</p>
                  <p className="text-sm text-muted-foreground mt-1">{ad.desc}</p>
                  <Button variant="outline" size="sm" className="rounded-full mt-3 text-primary border-primary">
                    Shop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-background border-t shadow-lg z-50 py-3">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <p className="text-sm text-foreground">
            Get an <strong>extra 10% Cash Back</strong> on these rates in your first 7 days.*
          </p>
          <Button size="sm" className="rounded-full font-semibold">Join for Free</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}