import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Gift, ChevronDown, User, Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignupModal from "./SignupModal";
import logo from "@/assets/brand/logo.png";

const categoryData: Record<string, { stores: { name: string; cashback: string; wasRate?: string }[]; featured: { image: string; brand: string; cashback: string; description: string } }> = {
  "Travel & Vacations": {
    stores: [
      { name: "Priceline", cashback: "Up to 8% Cash Back" },
      { name: "Hotels.com", cashback: "Up to 3% Cash Back" },
      { name: "Expedia", cashback: "Up to 3% Cash Back" },
      { name: "Booking.com", cashback: "Up to 5% Cash Back" },
      { name: "Orbitz", cashback: "Up to 4% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=450&fit=crop", brand: "Expedia", cashback: "Up to 3% Cash Back", description: "Save on your next getaway with exclusive travel deals." },
  },
  "Beauty & Wellness": {
    stores: [
      { name: "Macy's", cashback: "4% Cash Back", wasRate: "was 2%" },
      { name: "Target", cashback: "1% Cash Back" },
      { name: "Bloomingdale's", cashback: "2% Cash Back" },
      { name: "Nordstrom", cashback: "2% Cash Back" },
      { name: "Ulta Beauty", cashback: "2% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=450&fit=crop", brand: "Armani beauty", cashback: "2% Cash Back", description: "Discover the new Acqua Di Gio Intense + free mini." },
  },
  "Clothing": {
    stores: [
      { name: "AllSaints", cashback: "2% Cash Back" },
      { name: "eBay", cashback: "Up to 1% Cash Back" },
      { name: "Macy's", cashback: "4% Cash Back", wasRate: "was 2%" },
      { name: "Target", cashback: "1% Cash Back" },
      { name: "Bloomingdale's", cashback: "2% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=450&fit=crop", brand: "ShopSimon", cashback: "2.5% Cash Back", description: "Lafayette 148 New York - Up to 92% off" },
  },
  "Accessories": {
    stores: [
      { name: "Nordstrom", cashback: "2% Cash Back" },
      { name: "Macy's", cashback: "4% Cash Back", wasRate: "was 2%" },
      { name: "Coach Outlet", cashback: "3% Cash Back" },
      { name: "Kate Spade", cashback: "4% Cash Back" },
      { name: "Ray-Ban", cashback: "6% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=450&fit=crop", brand: "Coach Outlet", cashback: "3% Cash Back", description: "Up to 70% off + extra savings on select styles." },
  },
  "Auto & Tires": {
    stores: [
      { name: "AutoZone", cashback: "3% Cash Back" },
      { name: "Advance Auto Parts", cashback: "5% Cash Back" },
      { name: "Tire Rack", cashback: "4% Cash Back" },
      { name: "Pep Boys", cashback: "3% Cash Back" },
      { name: "CarParts.com", cashback: "6% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=450&fit=crop", brand: "Advance Auto Parts", cashback: "5% Cash Back", description: "Save on parts, batteries & accessories." },
  },
  "Baby & Toddler": {
    stores: [
      { name: "Target", cashback: "1% Cash Back" },
      { name: "Walmart", cashback: "Up to 3% Cash Back" },
      { name: "buybuy BABY", cashback: "2% Cash Back" },
      { name: "Carter's", cashback: "4% Cash Back" },
      { name: "The Children's Place", cashback: "5% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=450&fit=crop", brand: "Carter's", cashback: "4% Cash Back", description: "Adorable styles for your little one." },
  },
  "Banking & Finance Tools": {
    stores: [
      { name: "SoFi", cashback: "$125 Cash Back" },
      { name: "TurboTax", cashback: "20% Cash Back" },
      { name: "Credit Karma", cashback: "Up to $5 Cash Back" },
      { name: "H&R Block", cashback: "12% Cash Back" },
      { name: "NerdWallet", cashback: "Up to $10 Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=450&fit=crop", brand: "SoFi", cashback: "$125 Cash Back", description: "Open a checking & savings account today." },
  },
  "Electronics": {
    stores: [
      { name: "Best Buy", cashback: "Up to 15% Cash Back" },
      { name: "Samsung", cashback: "Up to 3% Cash Back" },
      { name: "Dell", cashback: "4% Cash Back" },
      { name: "HP", cashback: "3% Cash Back" },
      { name: "Lenovo", cashback: "5% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=450&fit=crop", brand: "Samsung", cashback: "Up to 3% Cash Back", description: "Discover the latest Galaxy devices." },
  },
  "Food, Drinks & Restaurants": {
    stores: [
      { name: "DoorDash", cashback: "Up to 5% Cash Back" },
      { name: "Instacart", cashback: "11% Cash Back" },
      { name: "GrubHub", cashback: "3% Cash Back" },
      { name: "Wine.com", cashback: "8% Cash Back" },
      { name: "HelloFresh", cashback: "Up to $10 Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=450&fit=crop", brand: "DoorDash", cashback: "Up to 5% Cash Back", description: "Order from your favorite restaurants." },
  },
  "Home & Garden": {
    stores: [
      { name: "Lowe's", cashback: "Up to 12% Cash Back" },
      { name: "Wayfair", cashback: "3% Cash Back" },
      { name: "IKEA", cashback: "12% Cash Back" },
      { name: "Overstock", cashback: "5% Cash Back" },
      { name: "Pottery Barn", cashback: "2% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=450&fit=crop", brand: "Wayfair", cashback: "3% Cash Back", description: "Up to 70% off during the Way Day sale." },
  },
  "Pets": {
    stores: [
      { name: "Chewy", cashback: "12% Cash Back" },
      { name: "PetSmart", cashback: "16% Cash Back" },
      { name: "Petco", cashback: "5% Cash Back" },
      { name: "BarkBox", cashback: "Up to $10 Cash Back" },
      { name: "Rover", cashback: "6% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=450&fit=crop", brand: "Chewy", cashback: "12% Cash Back", description: "Save on food, treats & essentials for your pet." },
  },
  "Shoes": {
    stores: [
      { name: "Nike", cashback: "15% Cash Back" },
      { name: "Adidas", cashback: "4% Cash Back" },
      { name: "New Balance", cashback: "3% Cash Back" },
      { name: "Hoka", cashback: "13% Cash Back" },
      { name: "DSW", cashback: "5% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=450&fit=crop", brand: "Nike", cashback: "15% Cash Back", description: "Shop the latest kicks and save." },
  },
  "Toys & Games": {
    stores: [
      { name: "LEGO", cashback: "Up to 12.50% Cash Back" },
      { name: "Target", cashback: "1% Cash Back" },
      { name: "Amazon", cashback: "$5 Cash Back" },
      { name: "GameStop", cashback: "2% Cash Back" },
      { name: "Hasbro", cashback: "4% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop", brand: "LEGO", cashback: "Up to 12.50% Cash Back", description: "Build something amazing. New sets available." },
  },
  "Sports, Outdoors & Fitness": {
    stores: [
      { name: "Dick's Sporting Goods", cashback: "12% Cash Back" },
      { name: "Under Armour", cashback: "18% Cash Back" },
      { name: "REI", cashback: "3% Cash Back" },
      { name: "Backcountry", cashback: "5% Cash Back" },
      { name: "Academy Sports", cashback: "4% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=450&fit=crop", brand: "Under Armour", cashback: "18% Cash Back", description: "Gear up for your next workout." },
  },
  "Business Supplies & Services": {
    stores: [
      { name: "Staples", cashback: "12% Cash Back" },
      { name: "Office Depot", cashback: "5% Cash Back" },
      { name: "Vistaprint", cashback: "8% Cash Back" },
      { name: "FedEx", cashback: "3% Cash Back" },
      { name: "Grammarly", cashback: "Up to 40% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop", brand: "Staples", cashback: "12% Cash Back", description: "Office essentials at great prices." },
  },
  "Digital Services & Streaming": {
    stores: [
      { name: "NordVPN", cashback: "105% Cash Back" },
      { name: "ExpressVPN", cashback: "Up to 45% Cash Back" },
      { name: "Hulu", cashback: "Up to $5 Cash Back" },
      { name: "Disney+", cashback: "Up to $3 Cash Back" },
      { name: "Spotify", cashback: "Up to $5 Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=450&fit=crop", brand: "NordVPN", cashback: "105% Cash Back", description: "Protect your privacy online with top-rated VPN." },
  },
  "Events & Entertainment": {
    stores: [
      { name: "Ticketmaster", cashback: "Up to 13% Cash Back" },
      { name: "StubHub", cashback: "3% Cash Back" },
      { name: "Vivid Seats", cashback: "5% Cash Back" },
      { name: "SeatGeek", cashback: "4% Cash Back" },
      { name: "AMC Theatres", cashback: "2% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=450&fit=crop", brand: "Ticketmaster", cashback: "Up to 13% Cash Back", description: "Get tickets to concerts, sports & more." },
  },
  "Gifts, Flowers & Parties": {
    stores: [
      { name: "1-800-Flowers", cashback: "8% Cash Back" },
      { name: "Shutterfly", cashback: "12% Cash Back" },
      { name: "Harry & David", cashback: "6% Cash Back" },
      { name: "Edible Arrangements", cashback: "5% Cash Back" },
      { name: "Party City", cashback: "3% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=450&fit=crop", brand: "1-800-Flowers", cashback: "8% Cash Back", description: "Send beautiful bouquets & gifts." },
  },
  "Subscription Boxes & Services": {
    stores: [
      { name: "HelloFresh", cashback: "Up to $10 Cash Back" },
      { name: "BarkBox", cashback: "Up to $10 Cash Back" },
      { name: "FabFitFun", cashback: "12% Cash Back" },
      { name: "Blue Apron", cashback: "Up to $8 Cash Back" },
      { name: "Birchbox", cashback: "6% Cash Back" },
    ],
    featured: { image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&h=450&fit=crop", brand: "HelloFresh", cashback: "Up to $10 Cash Back", description: "Get cooking with fresh, pre-portioned ingredients." },
  },
};

const categoryNames = Object.keys(categoryData);

const navTabs = [
  { label: "Extra Cash Back", icon: "💰" },
  { label: "Hot Deals", icon: "🔥" },
  { label: "In-Store", icon: "📍" },
  { label: "Travel", icon: "✈️" },
  { label: "Beauty & Wellness", icon: "💄" },
  { label: "Refer & Earn $50+", icon: "🎁" },
  { label: "Help", icon: "❓" },
];

interface NavbarProps {
  isLoggedIn?: boolean;
  variant?: "landing" | "dashboard";
}

export default function Navbar({ isLoggedIn = false, variant = "landing" }: NavbarProps) {
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCategoryEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setShowCategories(true);
  };

  const handleCategoryLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setShowCategories(false);
      setActiveCategory(null); // Reset active category when menu closes
    }, 200);
  };

  const activeCat = activeCategory ? categoryData[activeCategory] : null;

  return (
    <>
      {isLoggedIn && (
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
          Tax Day is coming! Last chance for tax prep deals{" "}
          <Link to="/promotions" className="underline ml-2 font-semibold">See Deals →</Link>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-1 shrink-0 -ml-2">
              <img src={logo} alt="Growyle" className="h-[48px] w-auto object-contain" />
            </Link>

            <div className="hidden md:flex items-center gap-4 flex-1 mx-8">
                  <div 
                    className="relative"
                    onMouseEnter={handleCategoryEnter} 
                    onMouseLeave={handleCategoryLeave}
                  >
                    <button className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors py-4">
                      {variant === "dashboard" ? (
                        <>
                          <span className="grid grid-cols-2 gap-0.5 w-4 h-4 mr-1">
                            {[...Array(4)].map((_, i) => (<span key={i} className="w-1.5 h-1.5 rounded-sm bg-foreground" />))}
                          </span>
                          Categories
                        </>
                      ) : (
                        "Shop by Category"
                      )}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCategories ? "rotate-180" : ""}`} />
                    </button>
                  </div>

              {variant === "dashboard" ? (
                <div className="relative flex-1 max-w-md ml-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Try searching for brands" className="pl-10 bg-secondary border-0 h-10 rounded-full" />
                </div>
              ) : (
                <>
                  <Link to="/promotions" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Browser Extension</Link>
                  <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mobile App</Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary">
                    <Gift className="w-4 h-4" /> Rewards
                  </Link>
                  <div className="relative">
                    <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary">
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">$0.00</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-background rounded-lg shadow-xl border py-2 z-50">
                        {["Account", "Cash Back Activity", "Shopping Trips", "Account Settings", "Linked Credit Cards", "Favorite Stores"].map(item => (
                          <button key={item} className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors">{item}</button>
                        ))}
                        <div className="border-t my-1" />
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors">Sign Out</button>
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors">Help</button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="hidden md:inline text-sm font-medium text-foreground hover:text-primary transition-colors">Sign In</Link>
                  <Button onClick={() => setShowSignup(true)} size="sm" className="rounded-full px-6 font-semibold">Join for Free</Button>
                </>
              )}
              <button className="md:hidden p-2" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isLoggedIn && variant === "dashboard" && (
            <div className="hidden md:flex items-center gap-6 py-2 overflow-x-auto">
              {navTabs.map(tab => (
                <button key={tab.label} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary whitespace-nowrap transition-colors">
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>



        {/* Professional Two-Stage Mega Dropdown - Ultimate Wide, Anchored Left */}
        {showCategories && (
          <div
            className={`absolute top-full bg-background border border-t-0 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] z-40 transition-all duration-500 ease-in-out transform-gpu overflow-hidden rounded-b-[2rem] animate-fade-in animate-slide-down ${
              activeCategory 
                ? "left-4 md:left-[5%] lg:left-[10%] w-[1520px] max-w-[90vw] right-auto" 
                : "left-4 md:left-[10%] lg:left-[15%] w-[320px] right-auto"
            }`}
            onMouseEnter={handleCategoryEnter}
            onMouseLeave={handleCategoryLeave}
          >
            <div className={`transition-all duration-500 ${activeCategory ? "opacity-100" : ""}`}>
              <div className="flex h-full min-h-fit">
                {/* Left Sidebar - Contained Categories (Stage 1) - Consistent Background */}
                <div className={`w-[280px] border-r border-border/10 py-6 px-1 pr-4 flex flex-col shrink-0 transition-colors duration-500`}>
                  <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-5 px-4">Categories</p>
                  <div className="space-y-0.5">
                    {categoryNames.map(cat => (
                      <button
                        key={cat}
                        onMouseEnter={() => setActiveCategory(cat)}
                        className={`relative w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all duration-200 group ${
                          activeCategory === cat
                            ? "text-primary font-bold bg-primary/[0.04]"
                            : "text-foreground/60 hover:text-foreground hover:bg-accent/40"
                        }`}
                      >
                        {cat}
                        <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary transition-opacity duration-300 ${activeCategory === cat ? "opacity-100" : "opacity-0"}`} />
                        {activeCategory === cat && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side Content - Progressive Reveal (Stage 2) */}
                <div className={`flex flex-1 transition-all duration-500 ease-out py-6 pb-10 ${
                  activeCategory 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-12 pointer-events-none w-0 overflow-hidden"
                }`}>
                  {activeCat && (
                    <div className="flex flex-1 min-w-[600px]">
                      {/* Center List - Fits Content */}
                      <div className="flex-1 px-10 border-r border-border/5 pr-6">
                        <div className="mb-6 flex items-center justify-between">
                          <h3 className="text-2xl font-bold text-foreground tracking-tight" key={activeCategory}>
                            {activeCategory}
                          </h3>
                        </div>
                        <div className="space-y-0 capitalize">
                          {activeCat.stores.map((store, i) => (
                            <div key={i} className="flex items-center justify-between py-3.5 border-b border-border/5 group hover:bg-secondary/5 px-4 -mx-4 rounded-xl transition-all">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-[15px] text-foreground group-hover:text-primary transition-colors">{store.name}</span>
                                  <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-primary text-[13px] font-bold tracking-wide">{store.cashback}</span>
                                  {store.wasRate && <span className="text-muted-foreground/40 text-[11px] line-through">was {store.wasRate}</span>}
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="rounded-full text-[11px] font-bold px-5 h-9 border-2 border-border/20 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                Shop Now
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Promo - Matched to Reference Image */}
                      <div className="w-[520px] px-8 pl-12 flex flex-col justify-between shrink-0">
                        <div className="flex flex-col gap-5 group/featured" key={activeCategory}>
                          <div className="relative aspect-video rounded-[1.5rem] overflow-hidden shadow-sm">
                            <img
                              src={activeCat.featured.image}
                              alt={activeCat.featured.brand}
                              className="w-full h-full object-cover group-hover/featured:scale-105 transition-transform duration-1000"
                              loading="lazy"
                            />
                            {/* Floating Brand Logo Overlay */}
                            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center p-1.5 border border-border/10">
                                <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-[10px] font-black text-primary">G</span>
                                </div>
                            </div>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="absolute bottom-4 right-4 rounded-full text-[11px] font-bold shadow-md backdrop-blur-md bg-white text-primary px-5 h-9 border-0 hover:bg-primary hover:text-white transition-all"
                            >
                              See Details
                            </Button>
                          </div>
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-xl text-foreground leading-tight tracking-tight">{activeCat.featured.brand}</h4>
                            <p className="text-primary font-bold text-base tracking-tight">{activeCat.featured.cashback}</p>
                            <p className="text-foreground text-[15px] font-bold leading-snug max-w-[90%]">
                              {activeCat.featured.description}
                            </p>
                          </div>
                        </div>

                        {/* Professional Mini-Banner */}
                        <div className="mt-10">
                            <div className="flex items-center gap-3 bg-secondary/30 p-4 rounded-2xl border border-border/10">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Gift className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-foreground">Double Cash Back!</p>
                                    <p className="text-[10px] text-muted-foreground/70">{activeCategory} brands are on sale today.</p>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <SignupModal open={showSignup} onClose={() => setShowSignup(false)} />
    </>
  );
}