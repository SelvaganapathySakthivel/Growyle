import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupModal from "@/components/SignupModal";
import HeroCarousel from "@/components/HeroCarousel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import rewardOnline from "@/assets/reward-online.jpg";
import rewardApp from "@/assets/reward-app.jpg";
import rewardInstore from "@/assets/reward-instore.jpg";
import rewardDining from "@/assets/reward-dining.jpg";
import stackSavings from "@/assets/stack-savings.jpg";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import FallingBrands from "@/components/FallingBrands";
import Stack from "@/components/Stack";
import GlassBrandCard from "@/components/GlassBrandCard";
import SavingsCard from "@/components/SavingsCard";

const brands = [
  { name: "Amazon", cashback: "$5", logo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128", bgColor: "#232F3E", textColor: "#ffffff" },
  { name: "Macy's", cashback: "14%", logo: "https://www.google.com/s2/favicons?domain=macys.com&sz=128", bgColor: "#E21A2C", textColor: "#ffffff" },
  { name: "Target", cashback: "11%", logo: "https://www.google.com/s2/favicons?domain=target.com&sz=128", bgColor: "#CC0000", textColor: "#ffffff" },
  { name: "ULTA", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=ulta.com&sz=128", bgColor: "#000000", textColor: "#ffffff" },
  { name: "Best Buy", cashback: "Up to 15%", logo: "https://www.google.com/s2/favicons?domain=bestbuy.com&sz=128", bgColor: "#0046BE", textColor: "#ffffff" },
  { name: "eBay", cashback: "Up to 11%", logo: "https://www.google.com/s2/favicons?domain=ebay.com&sz=128", bgColor: "#ffffff", textColor: "#000000" },
  { name: "Sephora", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=sephora.com&sz=128", bgColor: "#000000", textColor: "#ffffff" },
  { name: "Chewy", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=chewy.com&sz=128", bgColor: "#1C49C2", textColor: "#ffffff" },
  { name: "Old Navy", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=oldnavy.com&sz=128", bgColor: "#003865", textColor: "#ffffff" },
  { name: "Nike", cashback: "15%", logo: "https://www.google.com/s2/favicons?domain=nike.com&sz=128", bgColor: "#ffffff", textColor: "#000000" },
  { name: "Walmart", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=walmart.com&sz=128", bgColor: "#0071DC", textColor: "#ffffff" },
  { name: "Samsung", cashback: "Up to 3%", logo: "https://www.google.com/s2/favicons?domain=samsung.com&sz=128", bgColor: "#1428A0", textColor: "#ffffff" },
  { name: "Nordstrom", cashback: "Up to 13%", logo: "https://www.google.com/s2/favicons?domain=nordstrom.com&sz=128", bgColor: "#000000", textColor: "#ffffff" },
  { name: "Groupon", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=groupon.com&sz=128", bgColor: "#53A318", textColor: "#ffffff" },
  { name: "Lowe's", cashback: "Up to 12%", logo: "https://www.google.com/s2/favicons?domain=lowes.com&sz=128", bgColor: "#004990", textColor: "#ffffff" },
  { name: "Dick's", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=dickssportinggoods.com&sz=128", bgColor: "#00843D", textColor: "#ffffff" },
  { name: "PetSmart", cashback: "16%", logo: "https://www.google.com/s2/favicons?domain=petsmart.com&sz=128", bgColor: "#E41E31", textColor: "#ffffff" },
  { name: "Walgreens", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=walgreens.com&sz=128", bgColor: "#E31837", textColor: "#ffffff" },
  { name: "CVS", cashback: "15%", logo: "https://www.google.com/s2/favicons?domain=cvs.com&sz=128", bgColor: "#CC0000", textColor: "#ffffff" },
  { name: "Kohl's", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=kohls.com&sz=128", bgColor: "#000000", textColor: "#ffffff" },
  { name: "IKEA", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=ikea.com&sz=128", bgColor: "#0051BA", textColor: "#FFDA1A" },
  { name: "GAP", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=gap.com&sz=128", bgColor: "#000033", textColor: "#ffffff" },
  { name: "Adidas", cashback: "4%", logo: "https://www.google.com/s2/favicons?domain=adidas.com&sz=128", bgColor: "#000000", textColor: "#ffffff" },
  { name: "Priceline", cashback: "Up to 8%", logo: "https://www.google.com/s2/favicons?domain=priceline.com&sz=128", bgColor: "#0546A0", textColor: "#ffffff" },
  { name: "Booking.com", cashback: "Up to 5%", logo: "https://www.google.com/s2/favicons?domain=booking.com&sz=128", bgColor: "#003580", textColor: "#ffffff" },
  { name: "Expedia", cashback: "Up to 3%", logo: "https://www.google.com/s2/favicons?domain=expedia.com&sz=128", bgColor: "#00355F", textColor: "#ffffff" },
  { name: "NordVPN", cashback: "105%", logo: "https://www.google.com/s2/favicons?domain=nordvpn.com&sz=128", bgColor: "#4687FF", textColor: "#ffffff" },
  { name: "Lululemon", cashback: "2%", logo: "https://www.google.com/s2/favicons?domain=lululemon.com&sz=128", bgColor: "#D31334", textColor: "#ffffff" },
  { name: "Under Armour", cashback: "18%", logo: "https://www.google.com/s2/favicons?domain=underarmour.com&sz=128", bgColor: "#1D1D1D", textColor: "#ffffff" },
  { name: "Hoka", cashback: "13%", logo: "https://www.google.com/s2/favicons?domain=hoka.com&sz=128", bgColor: "#1A1A1A", textColor: "#ffffff" },
  { name: "Shutterfly", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=shutterfly.com&sz=128", bgColor: "#00A4E4", textColor: "#ffffff" },
  { name: "Hotels.com", cashback: "Up to 3%", logo: "https://www.google.com/s2/favicons?domain=hotels.com&sz=128", bgColor: "#D32F2F", textColor: "#ffffff" },
  { name: "Instacart", cashback: "11%", logo: "https://www.google.com/s2/favicons?domain=instacart.com&sz=128", bgColor: "#43B02A", textColor: "#ffffff" },
  { name: "Staples", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=staples.com&sz=128", bgColor: "#CC0000", textColor: "#ffffff" },
  { name: "Apple", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=apple.com&sz=128", bgColor: "#ffffff", textColor: "#000000" },
  { name: "SoFi", cashback: "$125", logo: "https://www.google.com/s2/favicons?domain=sofi.com&sz=128", bgColor: "#6C3BF5", textColor: "#ffffff" },
  { name: "Hollister", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=hollisterco.com&sz=128", bgColor: "#1C2D41", textColor: "#ffffff" },
  { name: "UGG", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=ugg.com&sz=128", bgColor: "#A67B5B", textColor: "#ffffff" },
  { name: "LEGO", cashback: "Up to 12.50%", logo: "https://www.google.com/s2/favicons?domain=lego.com&sz=128", bgColor: "#FFD700", textColor: "#000000" },
  { name: "Bloomingdales", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=bloomingdales.com&sz=128", bgColor: "#000000", textColor: "#ffffff" },
  { name: "Sam's Club", cashback: "Up to 18%", logo: "https://www.google.com/s2/favicons?domain=samsclub.com&sz=128", bgColor: "#0060A9", textColor: "#ffffff" },
  { name: "Ticketmaster", cashback: "Up to 13%", logo: "https://www.google.com/s2/favicons?domain=ticketmaster.com&sz=128", bgColor: "#1C5CA7", textColor: "#ffffff" },
  { name: "Victoria's Secret", cashback: "12%", logo: "https://www.google.com/s2/favicons?domain=victoriassecret.com&sz=128", bgColor: "#ED7AA9", textColor: "#ffffff" },
  { name: "TurboTax", cashback: "20%", logo: "https://www.google.com/s2/favicons?domain=turbotax.intuit.com&sz=128", bgColor: "#365ABE", textColor: "#ffffff" },
  { name: "American Eagle", cashback: "14%", logo: "https://www.google.com/s2/favicons?domain=ae.com&sz=128", bgColor: "#1A1A1A", textColor: "#ffffff" },
];

const reviews = [
  {
    quote: "CashBack stands out because you choose the type of rewards you earn. This flexibility makes it a great option for anyone who wants to maximize the value of every purchase.",
    source: "CNBC SELECT",
    date: "December 2025",
    bg: "bg-primary text-primary-foreground",
  },
  {
    quote: "CashBack is a strong option if you'd like to earn cash back on your online purchases. It's a rewards app and website that lets you get cash back at over 3,500 stores.",
    source: "BUSINESS INSIDER",
    date: "May 2025",
    bg: "section-blue text-foreground",
  },
  {
    quote: "We love CashBack because it helps users earn easy cash back on everyday purchases...and because you can opt to earn valuable Membership Rewards points instead.",
    source: "THE POINTS GUY",
    date: "July 2025",
    bg: "section-mint text-foreground",
  },
  {
    quote: "Of all the cash back sites our editors have tried, this one has some of the best promotions.",
    source: "REAL SIMPLE",
    date: "July 2025",
    bg: "section-pink text-foreground",
  },
];

const faqs = [
  { q: "How does CashBack handle my data?", a: "Your security and privacy are our top priorities. Every time you shop with CashBack, you can feel confident knowing your data and transactions are protected by industry-leading safeguards.\n\nWe do not sell your personal data to data brokers. However, we may share limited information with advertising partners to make your shopping experience more personalized. You have the option to opt out of this type of sharing." },
  { q: "How does CashBack make money?", a: "Brands partner with us to send them shoppers. They pay us and we share that money with you. That's how we're free." },
  { q: "Do I need receipts?", a: "No receipts needed for online shopping! When you shop through CashBack, your purchases are automatically tracked. For in-store Cash Back, simply link your credit or debit card and your purchases will be tracked automatically." },
  { q: "Do I need to link a credit card?", a: "Linking a card is optional but recommended. It unlocks In-Store Cash Back at thousands of stores and restaurants. Your card information is encrypted and secure." },
  { q: "Can I use coupons?", a: "Yes! Cash Back stacks on top of sales, coupons, and credit card rewards. Use the browser extension and we'll automatically apply eligible coupons at checkout." },
];

function ScrollSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`scroll-animate ${isVisible ? "visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground tracking-tight">
      <Navbar />

      <HeroCarousel onJoinClick={() => setShowSignup(true)} />

      {/* All Your Favorite Brands Section */}
      <section className="py-24 bg-[#f8fafc] overflow-hidden">
        <div className="container px-4 mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            All your favorite brands. All here.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <span className="text-primary font-semibold px-2 py-1 bg-accent rounded-lg mr-2">3,500+ brands</span>
            with new Cash Back rates every day.
          </p>
        </div>

        <div className="relative h-[500px] md:h-[700px] w-full">
          <FallingBrands brands={brands} />
        </div>

        <div className="container px-4 mx-auto mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Eligible rates include an extra 10% Cash Back as your welcome reward.<br />
            Earn up to an extra $50! <span className="text-primary underline cursor-pointer">Terms Apply</span>
          </p>
        </div>
      </section>

      {/* How it works - Purple Banner with rounded corners */}
      <ScrollSection className="container mx-auto px-4 lg:px-8">
        <section className="bg-primary py-20 text-primary-foreground relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 opacity-15">
            <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
              <path d="M0 200 Q 360 100, 720 200 Q 1080 300, 1440 200" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M0 250 Q 360 150, 720 250 Q 1080 350, 1440 250" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M-100 100 Q 400 300, 800 100 Q 1200 -100, 1600 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="0" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="1" />
              <line x1="200" y1="0" x2="600" y2="400" stroke="currentColor" strokeWidth="1" />
              <line x1="800" y1="0" x2="1200" y2="400" stroke="currentColor" strokeWidth="1" />
              <line x1="1000" y1="0" x2="1400" y2="400" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed max-w-3xl mx-auto">
              Brands partner with us to send them shoppers.
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed max-w-3xl mx-auto mt-4">
              They pay us and we share that money with you.
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
              That's how we're free.
            </p>
          </div>
        </section>
      </ScrollSection>

      {/* Rewards Section */}
      <section className="py-20">
        <ScrollSection className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">Rewards wherever you are</h2>
          <p className="text-center text-muted-foreground text-lg mb-16">Effortlessly shop and save across devices.</p>
        </ScrollSection>

        <div className="container mx-auto px-4 lg:px-8">
          <ScrollStack useWindowScroll={true} itemStackDistance={25} baseScale={0.92} blurAmount={2}>
            <ScrollStackItem itemClassName="section-pink">
              <div className="container mx-auto px-4 lg:px-8 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Earn Cash Back<br />online</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">Add the browser extension and activate Cash Back as you shop store sites. Or shop and save at CashBack.com.</p>
                    <Button className="rounded-full bg-foreground text-primary-foreground border-0 hover:bg-foreground/90 px-8">
                      Add the Extension
                    </Button>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <img src={rewardOnline} alt="Browser extension showing activate cash back" loading="lazy" width={640} height={512} className="rounded-2xl shadow-lg max-w-md w-full" />
                  </div>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="section-lavender">
              <div className="container mx-auto px-4 lg:px-8 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Earn Cash Back<br />on the app</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">Install the app, pick a brand and shop.</p>
                    <Button className="rounded-full bg-foreground text-primary-foreground border-0 hover:bg-foreground/90 px-8">
                      Get the App
                    </Button>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <img src={rewardApp} alt="CashBack mobile app" loading="lazy" width={640} height={512} className="rounded-2xl shadow-lg max-w-md w-full" />
                  </div>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="section-blue">
              <div className="container mx-auto px-4 lg:px-8 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Earn Cash Back<br />in stores</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">Use the app to search for In-Store Cash Back and pay with a card linked to your CashBack account.</p>
                    <Button className="rounded-full bg-foreground text-primary-foreground border-0 hover:bg-foreground/90 px-8">
                      See Stores
                    </Button>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <img src={rewardInstore} alt="Link your card for in-store cash back" loading="lazy" width={640} height={512} className="rounded-2xl shadow-lg max-w-md w-full" />
                  </div>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="section-mint">
              <div className="container mx-auto px-4 lg:px-8 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Earn Cash Back<br />at restaurants</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">Get 5% Cash Back at 22,000+ participating restaurants when you pay with a card linked to your account.</p>
                    <Button className="rounded-full bg-foreground text-primary-foreground border-0 hover:bg-foreground/90 px-8">
                      Learn More About Dining
                    </Button>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <img src={rewardDining} alt="Restaurant map showing dining cashback locations" loading="lazy" width={640} height={512} className="rounded-2xl shadow-lg max-w-md w-full" />
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
        <p className="text-xs text-muted-foreground mt-8 text-center">Cash Back rates may vary.</p>
      </section>

      {/* Stack Savings */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <ScrollSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-16">Stack the savings</h2>
        </ScrollSection>
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-5xl mx-auto">
          <ScrollSection className="flex-1">
            <div className="relative max-w-md mx-auto">
              <img src={stackSavings} alt="Stack your savings with cashback" loading="lazy" width={640} height={640} className="rounded-2xl shadow-lg w-full" />
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                <SavingsCard />
              </div>
              <div className="mt-4 md:hidden flex justify-center">
                <SavingsCard />
              </div>
            </div>
          </ScrollSection>
          <ScrollSection className="flex-1" delay={0.15}>
            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-foreground font-medium leading-relaxed">
                Cash Back stacks on top of sales and credit card rewards.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                It also stacks on top of coupons and other great deals we offer. Use the browser extension and we'll automatically apply eligible coupons at checkout.
              </p>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* Reviews */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <ScrollSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-12">Real reviews about real rewards</h2>
        </ScrollSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <ScrollSection key={i} delay={i * 0.1}>
              <div className={`${review.bg} rounded-2xl p-6 flex flex-col justify-between min-h-[320px] transition-transform duration-300 hover:scale-[1.03]`}>
                <p className="text-sm leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-current/10">
                  <p className="font-extrabold text-base tracking-wide">{review.source}</p>
                  <p className="text-xs opacity-70 mt-1">{review.date}</p>
                </div>
              </div>
            </ScrollSection>
          ))}
        </div>
      </section>

      {/* Get Paid Your Way */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <ScrollSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-16">Get paid your way</h2>
        </ScrollSection>
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-5xl mx-auto">
          <ScrollSection className="flex-1 flex justify-center">
            <div className="w-[280px] h-[280px]">
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                cards={[
                  <div key="paypal" className="w-full h-full bg-accent rounded-2xl flex flex-col items-center justify-center gap-3">
                    <span className="text-6xl">💳</span>
                    <span className="text-lg font-bold text-foreground">PayPal</span>
                    <span className="text-sm text-muted-foreground">Instant transfer</span>
                  </div>,
                  <div key="check" className="w-full h-full bg-accent rounded-2xl flex flex-col items-center justify-center gap-3">
                    <span className="text-6xl">📧</span>
                    <span className="text-lg font-bold text-foreground">Check</span>
                    <span className="text-sm text-muted-foreground">Mailed to you</span>
                  </div>,
                  <div key="gift" className="w-full h-full bg-accent rounded-2xl flex flex-col items-center justify-center gap-3">
                    <span className="text-6xl">🎁</span>
                    <span className="text-lg font-bold text-foreground">Gift Cards</span>
                    <span className="text-sm text-muted-foreground">50+ top brands</span>
                  </div>,
                  <div key="points" className="w-full h-full bg-accent rounded-2xl flex flex-col items-center justify-center gap-3">
                    <span className="text-6xl">⭐</span>
                    <span className="text-lg font-bold text-foreground">Bilt Points</span>
                    <span className="text-sm text-muted-foreground">Earn rewards</span>
                  </div>,
                ]}
              />
            </div>
          </ScrollSection>
          <ScrollSection className="flex-1" delay={0.15}>
            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-foreground font-medium leading-relaxed">
                Rewards are sent every 3 months. Choose PayPal, Bilt Points or check.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Want your Cash Back faster? Cash out instantly with gift cards from 50+ top brands, including Amazon, Starbucks, DoorDash and Sephora.
              </p>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* CTA Banner */}
      <ScrollSection className="container mx-auto px-4 lg:px-8 py-8">
        <div className="bg-primary rounded-3xl py-20 text-center text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1440 300" preserveAspectRatio="none">
              <path d="M0 150 Q 360 50, 720 150 Q 1080 250, 1440 150" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M-200 200 Q 400 0, 800 200 Q 1200 400, 1600 200" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="0" y1="0" x2="500" y2="300" stroke="currentColor" strokeWidth="1" />
              <line x1="940" y1="0" x2="1440" y2="300" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <div className="relative z-10 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Join over <span className="opacity-80">17 million</span> members
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10">and start saving.</p>
            <Button
              onClick={() => setShowSignup(true)}
              variant="outline"
              size="lg"
              className="rounded-full px-12 py-6 text-lg bg-primary-foreground text-primary border-0 hover:bg-primary-foreground/90 font-semibold"
            >
              Join for Free
            </Button>
          </div>
        </div>
      </ScrollSection>

      {/* FAQ */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <ScrollSection className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">Still have questions?</h2>
          </ScrollSection>
          <ScrollSection className="lg:w-2/3" delay={0.1}>
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between py-6 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: openFaq === i ? "300px" : "0px",
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <div className="pb-6 text-muted-foreground leading-relaxed whitespace-pre-line">{faq.a}</div>
                </div>
              </div>
            ))}
          </ScrollSection>
        </div>
      </section>

      <Footer />
      <SignupModal open={showSignup} onClose={() => setShowSignup(false)} />
    </div>
  );
}
