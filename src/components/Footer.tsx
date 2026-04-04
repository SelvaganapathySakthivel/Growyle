import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "ABOUT",
    links: ["Getting Started", "About Us", "Advertising & Partnerships", "Influencers & Partners", "Press Room", "Careers", "Blog", "Terms & Conditions", "Privacy Policy", "Help"],
  },
  {
    title: "STORES & BRANDS",
    links: ["Best Buy", "Kohl's", "Lowe's", "Macy's", "Nordstrom", "Old Navy", "Priceline", "Target", "See All Brands", "See All Stores"],
  },
  {
    title: "POPULAR CATEGORIES",
    links: ["Travel & Vacations", "Clothing", "Food, Drinks & Restaurants", "Home & Garden", "Beauty & Wellness", "Electronics", "Banking & Finance Tools", "Shoes", "Accessories"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xs font-bold tracking-wider mb-4 opacity-70">DOWNLOAD OUR APP</h3>
            <p className="text-sm mb-1">CashBack Mobile Apps</p>
            <p className="text-sm opacity-70 mb-6">📱 Available for iOS and Android</p>
            <h3 className="text-xs font-bold tracking-wider mb-4 opacity-70">PARTNER SITES</h3>
            {["Canada", "Japan", "France"].map(site => (
              <p key={site} className="text-sm opacity-80 mb-1 hover:opacity-100 cursor-pointer transition-opacity">{site}</p>
            ))}
          </div>

          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-xs font-bold tracking-wider mb-4 opacity-70">{section.title}</h3>
              <ul className="space-y-1.5">
                {section.links.map(link => (
                  <li key={link}>
                    <Link to="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6">
          <p className="text-xs opacity-60 mb-4">
            © 2026 CashBack Rewards Inc. All rights reserved. Powered by smart savings technology.
          </p>
          <div className="flex items-center gap-4">
            {["Instagram", "TikTok", "Facebook", "YouTube", "Pinterest", "LinkedIn"].map(social => (
              <span key={social} className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-xs opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                {social[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}