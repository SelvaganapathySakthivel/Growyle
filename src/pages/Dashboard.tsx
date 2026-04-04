import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandCard from "@/components/BrandCard";

const boostStores = [
  { name: "eBay", cashback: "Up to 11% Cash Back", prev: "was 1%", logo: "eB" },
  { name: "Macy's", cashback: "16% Cash Back", prev: "was 2%", logo: "M★" },
  { name: "Lowe's", cashback: "11% Cash Back", prev: "was 1%", logo: "L" },
  { name: "Best Buy", cashback: "Up to 15% Cash Back", prev: "was 5%", logo: "BB" },
  { name: "Target", cashback: "11% Cash Back", prev: "was 1%", logo: "🎯" },
  { name: "Bloomingdale's", cashback: "12% Cash Back", prev: "was 2%", logo: "B" },
];

const memberFaves = [
  { name: "Macy's", cashback: "16% Cash Back", prev: "was 2%", logo: "M★" },
  { name: "Target", cashback: "11% Cash Back", prev: "was 1%", logo: "🎯" },
  { name: "TEMU", cashback: "22% Cash Back", prev: "was 3%", logo: "T" },
  { name: "Kohl's", cashback: "12% Cash Back", prev: "was 2%", logo: "K" },
  { name: "Nike", cashback: "6% Cash Back", prev: "was 2%", logo: "N" },
  { name: "Ulta Beauty", cashback: "12% Cash Back", prev: "was 2%", logo: "U" },
];

const topStores = [
  { name: "Priceline", cashback: "Up to 4% Cash Back", prev: "was 2%", logo: "P" },
  { name: "adidas", cashback: "4% Cash Back", prev: "was 2%", logo: "Ad" },
  { name: "Macy's", cashback: "16% Cash Back", prev: "was 2%", logo: "M★", tag: "Just for you" },
  { name: "Hotels.com", cashback: "Up to 3% Cash Back", prev: "was 1%", logo: "H" },
  { name: "TurboTax", cashback: "20% Cash Back", prev: "was 5%", logo: "TT", tag: "Just for you" },
  { name: "Sam's Club", cashback: "Up to 18% Cash Back", prev: "was 4%", logo: "SC", tag: "Just for you" },
];

const deals = [
  { name: "Best Buy", cashback: "Up to 15% Cash Back", prev: "was 5%", logo: "BB", desc: "Shop the Samsung Galaxy S26 Ultra from $399.99.", action: "Shop" },
  { name: "H&R Block", cashback: "22% Cash Back", prev: "was 4%", logo: "HR", desc: "Get 20% off your online tax filing.", action: "See Details" },
  { name: "Glasses.com", cashback: "15% Cash Back", prev: "was 5%", logo: "G", desc: "Get $15 off + free shipping.", action: "Get Code" },
  { name: "Skechers", cashback: "13% Cash Back", prev: "was 3%", logo: "SK", desc: "Buy one, get one 50% off regular priced items.", action: "Shop" },
  { name: "Lenovo", cashback: "2% Cash Back", logo: "Le", desc: "Customize a PC that works for you.", action: "Shop" },
  { name: "woot!", cashback: "Up to 16% Cash Back", prev: "was 6%", logo: "W", desc: "Get up to 70% off Amazon basics & essentials.", action: "Shop" },
];

const categories = [
  { name: "Travel & Vacations", emoji: "✈️" },
  { name: "Clothing", emoji: "👔" },
  { name: "Home & Garden", emoji: "🏡" },
  { name: "Food & Restaurants", emoji: "🍕" },
  { name: "Electronics", emoji: "💻" },
  { name: "Beauty & Wellness", emoji: "💄" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn variant="dashboard" />

      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-lg font-medium opacity-80 mb-2">Gettin' Cash Back</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Learn how to use CashBack</h1>
              <Button variant="outline" className="rounded-full bg-primary-foreground text-primary border-0 hover:bg-primary-foreground/90 font-semibold">
                Let's Go
              </Button>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="bg-primary-foreground/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold">$157.63</p>
                <p className="text-sm opacity-80 mt-1">PayPal • Cash Back</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Miss out on deals?", subtitle: "Not with our app.", desc: "Get alerts for exclusive offers and Cash Back.", bg: "section-pink" },
            { title: "YOU ASKED.", subtitle: "WE DELIVERED.", desc: "The big deal reveal is here.", bg: "section-lavender" },
            { title: "Our browser extension", subtitle: "is the easiest way to save", desc: "Just click 'Activate Cash Back' and shop as you normally do.", bg: "section-blue" },
          ].map(card => (
            <div key={card.title} className={`${card.bg} rounded-2xl p-6 min-h-[200px] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow`}>
              <div>
                <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                <p className="text-lg font-bold text-foreground">{card.subtitle}</p>
                <p className="text-sm text-muted-foreground mt-2">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {[
        { title: "Shop with your boost", subtitle: "Rack up Cash Back on our top stores", stores: boostStores },
        { title: "Some member faves", stores: memberFaves },
        { title: "Top stores you'll love", stores: topStores },
      ].map(section => (
        <section key={section.title} className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              {section.subtitle && <p className="text-muted-foreground">{section.subtitle}</p>}
            </div>
            <Link to="/promotions" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
              See All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {section.stores.map((store: any) => (
              <BrandCard key={store.name + section.title} name={store.name} cashback={store.cashback} previousRate={store.prev} logo={store.logo} tag={store.tag} />
            ))}
          </div>
        </section>
      ))}

      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">What's the deal?</h2>
            <p className="text-muted-foreground">Coupons, sales, and major cha-ching this way.</p>
          </div>
          <Link to="/promotions" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {deals.map(deal => (
            <BrandCard key={deal.name + "deal"} variant="deal" name={deal.name} cashback={deal.cashback} previousRate={deal.prev} logo={deal.logo} description={deal.desc} actionLabel={deal.action} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">More ways to cha-ching</h2>
            <p className="text-muted-foreground">Find Cash Back on almost everything.</p>
          </div>
          <Link to="/categories" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link key={cat.name} to="/categories" className="group">
              <div className="aspect-[4/3] rounded-xl section-mint flex items-center justify-center text-4xl transition-all group-hover:shadow-md group-hover:scale-105">
                {cat.emoji}
              </div>
              <p className="text-sm font-medium text-foreground mt-2">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

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
