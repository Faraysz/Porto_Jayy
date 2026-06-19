import { useState, useEffect } from 'react';
import { Calculator, Send, CheckCircle, Smartphone, Layout, HelpCircle } from 'lucide-react';

interface BudgetCalculatorProps {
  onApplyEstimate: (estimateText: string) => void;
}

export default function BudgetCalculator({ onApplyEstimate }: BudgetCalculatorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(['uiux', 'webdev']);
  const [pagesCount, setPagesCount] = useState<number>(5);
  const [withHosting, setWithHosting] = useState<boolean>(true);
  const [withSEO, setWithSEO] = useState<boolean>(true);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [messageApplied, setMessageApplied] = useState<boolean>(false);

  // Price calculation logic (in Indonesian Rupiah IDR)
  useEffect(() => {
    let baseRate = 0;
    
    // Services base costs
    if (selectedServices.includes('uiux')) baseRate += 6000000;
    if (selectedServices.includes('webdev')) baseRate += 10000000;
    if (selectedServices.includes('branding')) baseRate += 5000000;

    // Scale rate based on count of screens/pages
    const pageCost = pagesCount * 800000;
    
    let extraCosts = 0;
    if (withHosting) extraCosts += 1500000; // premium speed hosting setup + domain (.id)
    if (withSEO) extraCosts += 2000000;      // full SEO checklist & Speed Audit

    setEstimatedCost(baseRate + pageCost + extraCosts);
  }, [selectedServices, pagesCount, withHosting, withSEO]);

  const handleServiceToggle = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleApply = () => {
    const servicesName = selectedServices.map(s => {
      if (s === 'uiux') return 'Desain UI/UX';
      if (s === 'webdev') return 'Pengembangan Web (React/Vite)';
      return 'Branding & Logo Identitas';
    }).join(', ');

    const formatRupiah = (num: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
    };

    const estimateString = `Halo Atmajaya, saya ingin berkonsultasi mengenai proyek saya dengan perkiraan spesifikasi berikut:
- Layanan yang dibutuhkan: ${servicesName || 'Konsultasi Umum'}
- Estimasi Jumlah Halaman/Modul: ${pagesCount} halaman
- Tambahan Hosting & Domain: ${withHosting ? 'Ya' : 'Tidak'}
- Tambahan SEO & Optimasi Kecepatan: ${withSEO ? 'Ya' : 'Tidak'}
- Estimasi Biaya Teoretis: ${formatRupiah(estimatedCost)}

Mari kita diskusikan lebih lanjut!`;

    onApplyEstimate(estimateString);
    setMessageApplied(true);
    setTimeout(() => setMessageApplied(false), 3000);
  };

  return (
    <div id="budget-calculator-card" className="bg-white border-[3px] border-on-background neubrutal-shadow p-6 rounded-none space-y-6">
      <div className="flex items-center gap-3 border-b-2 border-on-background pb-3">
        <Calculator className="w-6 h-6 text-secondary" />
        <h3 className="font-display font-extrabold text-xl text-on-background uppercase tracking-tight">
          KALKULATOR PROYEK INTERAKTIF
        </h3>
      </div>
      
      <p className="font-body text-sm text-on-surface-variant">
        Rancang perkiraan spesifikasi proyek Anda dan dapatkan estimasi biaya secara instan! Klik tombol di bawah untuk menyalin langsung ke form pesan Anda.
      </p>

      {/* Services choice checklist */}
      <div className="space-y-3">
        <label className="font-label text-xs uppercase font-bold text-on-surface-variant block">1. Pilih Layanan Utama</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: 'uiux', label: 'UI/UX Desain', icon: Layout },
            { id: 'webdev', label: 'Web Dev (React)', icon: Smartphone },
            { id: 'branding', label: 'Branding Merek', icon: HelpCircle },
          ].map((service) => {
            const isSelected = selectedServices.includes(service.id);
            const IconComp = service.icon;
            return (
              <button
                id={`calc-service-${service.id}`}
                key={service.id}
                type="button"
                onClick={() => handleServiceToggle(service.id)}
                className={`flex items-center gap-2 p-3 border-2 border-on-background font-label text-xs uppercase font-extrabold text-left transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-primary-container text-on-background neubrutal-shadow' 
                    : 'bg-white text-on-surface-variant'
                }`}
              >
                <IconComp className="w-4 h-4 shrink-0" />
                <span>{service.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slider for pages */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="font-label text-xs uppercase font-bold text-on-surface-variant">
            2. Jumlah Halaman / Modul
          </label>
          <span className="font-label text-xs font-extrabold bg-secondary text-white px-2 py-0.5 border-2 border-on-background">
            {pagesCount} Halaman/Seksi
          </span>
        </div>
        <input 
          id="calc-pages-slider"
          type="range" 
          min="1" 
          max="25" 
          value={pagesCount} 
          onChange={(e) => setPagesCount(Number(e.target.value))}
          className="w-full accent-secondary cursor-pointer h-2 bg-surface-container border border-on-background"
        />
        <div className="flex justify-between text-[10px] font-label text-on-surface-variant uppercase">
          <span>Sederhana (1)</span>
          <span>Menengah (12)</span>
          <span>Kompleks (25)</span>
        </div>
      </div>

      {/* Checklist addons */}
      <div className="space-y-3">
        <label className="font-label text-xs uppercase font-bold text-on-surface-variant block">3. Tambahan Optimasi</label>
        <div className="space-y-2">
          {/* Addon 1 */}
          <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-container-low transition-colors border border-transparent hover:border-on-background">
            <input
              id="calc-addon-hosting"
              type="checkbox"
              checked={withHosting}
              onChange={(e) => setWithHosting(e.target.checked)}
              className="accent-secondary w-5 h-5 border-2 border-on-background"
            />
            <div className="font-body text-xs text-on-background">
              <span className="font-bold block">Hosting Premium + Domain .id (+Rp 1.5M)</span>
              <span className="text-on-surface-variant">Penerbitan web instan ke server global super kencang.</span>
            </div>
          </label>
          {/* Addon 2 */}
          <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-container-low transition-colors border border-transparent hover:border-on-background">
            <input
              id="calc-addon-seo"
              type="checkbox"
              checked={withSEO}
              onChange={(e) => setWithSEO(e.target.checked)}
              className="accent-secondary w-5 h-5 border-2 border-on-background"
            />
            <div className="font-body text-xs text-on-background">
              <span className="font-bold block">SEO Lengkap &amp; Kecepatan Audit (+Rp 2M)</span>
              <span className="text-on-surface-variant">Optimalkan skor Google Lighthouse, meta-tags, &amp; kecepatan render.</span>
            </div>
          </label>
        </div>
      </div>

      {/* Dynamic Price Display */}
      <div className="bg-secondary-container/20 p-4 border-2 border-on-background flex justify-between items-center">
        <div>
          <span className="text-[10px] font-label uppercase font-extrabold text-on-surface-variant block">Estimasi Kasar</span>
          <span className="font-display font-black text-xl text-on-background md:text-2xl">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(estimatedCost)}
          </span>
        </div>
        <button
          id="calc-apply-btn"
          type="button"
          onClick={handleApply}
          className="flex items-center gap-2 bg-secondary text-on-secondary px-4 py-2 border-2 border-on-background font-label text-xs uppercase font-extrabold neubrutal-shadow neubrutal-btn-active cursor-pointer"
        >
          {messageApplied ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Diterapkan!</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Gunakan di Form</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
