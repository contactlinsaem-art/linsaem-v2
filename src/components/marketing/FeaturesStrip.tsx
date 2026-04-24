"use client";
export function FeaturesStrip() {
  const features = [
    { icon: "🎨", title: "Design sur-mesure", desc: "Pas de template générique" },
    { icon: "📱", title: "100% Responsive", desc: "Mobile, tablette, desktop" },
    { icon: "🚀", title: "En ligne en 48h", desc: "Livraison ultra-rapide" },
    { icon: "📞", title: "Support humain", desc: "Une vraie personne vous répond" },
  ];

  return (
    <div className="border-y border-gray-100 bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="text-3xl">{f.icon}</div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{f.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
