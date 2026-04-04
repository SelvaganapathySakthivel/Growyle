const allCategories = [
  "Travel & Vacations", "Beauty & Wellness", "Clothing", "Accessories",
  "Auto & Tires", "Baby & Toddler", "Banking & Finance Tools",
  "Business Supplies & Services", "Digital Services & Streaming",
  "Electronics", "Events & Entertainment", "Food, Drinks & Restaurants",
  "Gifts, Flowers & Parties", "Home & Garden", "Pets", "Shoes",
  "Toys & Games", "Sports, Outdoors & Fitness", "Subscription Boxes & Services",
];

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function CategorySidebar({ activeCategory, onCategoryChange }: CategorySidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 pr-8">
      <nav className="space-y-0 sticky top-20">
        {allCategories.map(cat => (
          <button
            key={cat}
            onMouseEnter={() => onCategoryChange(cat)}
            onClick={() => onCategoryChange(cat)}
            className={`relative block w-full text-left text-sm py-2.5 px-3 transition-all duration-200 ease-out ${
              activeCategory === cat
                ? "text-primary font-semibold"
                : "text-foreground/80 hover:text-foreground"
            }`}
          >
            {/* Animated underline indicator */}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${
                activeCategory === cat ? "w-full" : "w-0"
              }`}
            />
            {cat}
          </button>
        ))}
      </nav>
    </aside>
  );
}