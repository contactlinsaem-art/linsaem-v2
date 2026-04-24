export function ComparisonBanner() {
  const items = [
    { label: "Éditeur en ligne A", price: "17€/mois", note: "Template générique", ours: false },
    { label: "Éditeur en ligne B", price: "16€/mois", note: "Vous faites tout", ours: false },
    { label: "Agence web", price: "500€+", note: "Paiement unique", ours: false },
    { label: "✨ LINSAEM", price: "5,99€/mois", note: "Design sur-mesure inclus", ours: true },
  ];

  return (
    <div className="bg-gray-900 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-white font-bold text-xl mb-10">
          Comparez nos tarifs avec les autres solutions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl p-6 text-center transition-transform hover:-translate-y-1 ${
                item.ours
                  ? "bg-gradient-to-br from-sky-500 to-violet-600 text-white shadow-2xl shadow-violet-900/50"
                  : "bg-white/10 text-white/80"
              }`}
            >
              <div className={`font-semibold text-sm mb-2 ${item.ours ? "text-white" : "text-white/60"}`}>
                {item.label}
              </div>
              <div className={`text-2xl font-extrabold mb-1 ${item.ours ? "text-white" : "text-white"}`}>
                {item.price}
              </div>
              <div className={`text-xs ${item.ours ? "text-sky-100" : "text-white/50"}`}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
