import { useState, useEffect } from 'react';
import { Mail, Trash2, X, ChevronUp, Bell, Check } from 'lucide-react';
import { ContactMessage } from '../types';

interface InboxTrayProps {
  triggerRefresh: boolean;
  onRefreshed: () => void;
}

export default function InboxTray({ triggerRefresh, onRefreshed }: InboxTrayProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchMessages = () => {
    try {
      const stored = localStorage.getItem('atmajaya_portfolio_messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local messages", e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (triggerRefresh) {
      fetchMessages();
      onRefreshed();
      
      // Trigger a visual confirmation notification
      setNotification("Pesan Baru Terkirim & Tersimpan di Browser!");
      setIsOpen(true); // Open the inbox so the user can see their submission!
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [triggerRefresh]);

  const handleClearAll = () => {
    if (window.confirm("Apakah Anda ingin menghapus semua pesan terkirim dari penyimpanan lokal browser ini?")) {
      localStorage.removeItem('atmajaya_portfolio_messages');
      setMessages([]);
    }
  };

  const handleRemoveOne = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    localStorage.setItem('atmajaya_portfolio_messages', JSON.stringify(updated));
    setMessages(updated);
  };

  return (
    <div id="inbox-tray-wrapper" className="fixed bottom-6 right-6 z-40 max-w-sm w-[90vw] font-body">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="toggle-inbox-tray-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-primary-container text-on-background border-3 border-on-background px-4 py-3 neubrutal-shadow font-label text-xs uppercase font-extrabold hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
        >
          <div className="relative">
            <Mail className="w-5 h-5" />
            {messages.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold border-2 border-on-background rounded-none">
                {messages.length}
              </span>
            )}
          </div>
          <span>Kotak Keluar ({messages.length})</span>
        </button>
      )}

      {/* Actual Opened Panel */}
      {isOpen && (
        <div id="inbox-panel" className="bg-white border-4 border-on-background neubrutal-shadow-lg flex flex-col max-h-[450px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-secondary text-on-secondary border-b-4 border-on-background">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <h4 className="font-display font-black text-sm uppercase tracking-tight">KIRIMAN FORM ANDA</h4>
            </div>
            <button 
              id="close-inbox-btn"
              onClick={() => setIsOpen(false)} 
              className="p-1 bg-white border-2 border-on-background text-on-background neubrutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick interactive notification bubble */}
          {notification && (
            <div className="bg-primary-container text-on-background p-3 text-xs font-bold border-b-2 border-on-background flex items-center gap-2">
              <Bell className="w-4 h-4 shrink-0 text-secondary animate-bounce" />
              <span>{notification}</span>
            </div>
          )}

          {/* Messages list */}
          <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-background text-on-background max-h-[300px]">
            {messages.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-sm font-bold text-on-surface-variant">Belum ada pesan terkirim.</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Gunakan form kontak di bawah atau Kalkulator Proyek untuk mengirimkan pesan demonstrasi Anda!
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="p-3 bg-white border-2 border-on-background neubrutal-shadow text-xs space-y-2 relative group">
                  <button
                    id={`delete-msg-${msg.id}`}
                    onClick={() => handleRemoveOne(msg.id)}
                    className="absolute top-2 right-2 text-on-surface-variant hover:text-red-600 transition-colors cursor-pointer"
                    title="Hapus pesan ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="pr-6 font-bold space-y-0.5">
                    <p className="font-display text-on-background text-sm">{msg.name}</p>
                    <p className="text-on-surface-variant text-[10px] break-all">{msg.email}</p>
                  </div>
                  <p className="text-on-background whitespace-pre-wrap pt-1 bg-surface-container-low p-2 border border-on-background/10">
                    {msg.message}
                  </p>
                  <div className="text-[9px] text-on-surface-variant text-right italic">
                    {msg.timestamp}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {messages.length > 0 && (
            <div className="p-3 bg-surface-container-high border-t-2 border-on-background flex justify-between items-center">
              <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase">
                Menyimpan {messages.length} data pesan
              </span>
              <button
                id="clear-all-inbox-btn"
                onClick={handleClearAll}
                className="flex items-center gap-1.5 bg-white border-2 border-on-background px-3 py-1 font-label text-[10px] uppercase font-bold text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Semua</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
