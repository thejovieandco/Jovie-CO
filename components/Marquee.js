const ITEMS = [
  "Crafted Today",
  "Treasured for Generations",
  "Free US Shipping Over $50",
  "Waterproof & Hypoallergenic",
  "Made to Be Passed Down",
];

// Infinite sliding band. Content is duplicated so the loop is seamless.
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((text, i) => (
          <span className="marquee-item" key={i}>
            {text}
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L22 9 L12 22 L2 9 Z" stroke="#C7A15A" strokeWidth="1.4" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
