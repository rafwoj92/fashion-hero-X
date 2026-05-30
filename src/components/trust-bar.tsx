import { Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";

const items = [
  {
    icon: Truck,
    label: "Darmowa dostawa",
    desc: "od 200 zł zamówienia",
  },
  {
    icon: RotateCcw,
    label: "30 dni na zwrot",
    desc: "bez pytań i formalności",
  },
  {
    icon: ShieldCheck,
    label: "Bezpieczna płatność",
    desc: "SSL + BLIK + PayPal",
  },
  {
    icon: Star,
    label: "4.8/5 — 2400 opinii",
    desc: "zweryfikowanych klientów",
  },
];

export function TrustBar() {
  return (
    <div
      style={{ backgroundColor: "#F8F8F6", borderBottom: "1px solid #EBEBEB" }}
      className="py-3"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="w-5 h-5 shrink-0 text-charcoal/70" />
              <div>
                <p className="text-[12px] font-semibold leading-tight">{label}</p>
                <p className="text-[11px] text-warm-gray leading-tight">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
