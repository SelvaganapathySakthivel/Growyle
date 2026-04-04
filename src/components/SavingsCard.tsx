import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    type: "savings" as const,
    rows: [
      { label: "Original price", value: "$295", color: "text-foreground" },
      { label: "Coupon: FRIENDS", value: "-$118", color: "text-foreground" },
      { label: "Cash Back:", value: "$17.70", color: "text-primary" },
    ],
    summary: { label: "You saved", amount: "$135.02" },
  },
  {
    type: "coupons" as const,
    brand: "CashBack",
    count: "5 Coupons found!",
    cta: "Apply Coupons",
  },
];

export default function SavingsCard() {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const interval = setInterval(() => { setCurrent((prev) => (prev + 1) % slides.length); }, 3500); return () => clearInterval(interval); }, []);
  const slide = slides[current];
  return (
    <div className="w-[220px] bg-background rounded-xl shadow-lg border border-border/40 overflow-hidden">
      <AnimatePresence mode="wait">
        {slide.type === "savings" ? (
          <motion.div key="savings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="p-4">
            <div className="space-y-2.5">
              {slide.rows.map((row, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15, duration: 0.3 }} className="flex justify-between items-center text-sm">
                  <span className={`font-medium ${row.label.includes("Cash Back") ? "text-primary" : "text-foreground"}`}>{row.label}</span>
                  <span className={`font-semibold ${row.color}`}>{row.value}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.3 }} className="mt-4 pt-3 border-t border-border/40 text-center">
              <p className="text-primary text-sm font-medium">You saved</p>
              <p className="text-primary text-2xl font-bold">$135.02</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="coupons" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="p-4 flex flex-col items-center gap-3">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-primary font-bold text-sm">CashBack</motion.p>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 300 }} className="text-3xl">🎫</motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-foreground text-sm font-medium">5 Coupons found!</motion.p>
            <motion.button initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-primary text-primary-foreground text-xs font-semibold px-6 py-2 rounded-full w-full">Apply Coupons</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}