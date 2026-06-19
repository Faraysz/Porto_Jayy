# 📧 Cara Integrasi EmailJS (Step-by-Step)

## Setup EmailJS dalam 10 Menit

### Step 1: Install EmailJS

```bash
npm install @emailjs/browser
```

---

### Step 2: Daftar & Setup di EmailJS

1. Buka: https://www.emailjs.com/
2. Klik **"Sign Up"** (bisa pakai Google/GitHub)
3. Setelah login, masuk ke **Dashboard**

---

### Step 3: Tambah Email Service

1. Di dashboard, klik **"Add New Service"**
2. Pilih provider Anda (contoh: Gmail)
3. Ikuti instruksi koneksi:
   - Untuk Gmail: Login dengan akun Google Anda
   - Berikan permission ke EmailJS
4. **Copy Service ID** (contoh: `service_abc123`)

---

### Step 4: Buat Email Template

1. Klik tab **"Email Templates"**
2. Klik **"Create New Template"**
3. Edit template dengan variabel:

```
Subject: Pesan Baru dari Portfolio - {{from_name}}

Halo Atmajaya,

Anda mendapat pesan baru dari portfolio website:

Nama: {{from_name}}
Email: {{from_email}}

Pesan:
{{message}}

---
Dikirim dari: https://portfolio-atmajaya.com
```

4. **Copy Template ID** (contoh: `template_xyz789`)

---

### Step 5: Dapatkan Public Key

1. Klik **"Account"** di menu atas
2. Copy **"Public Key"** Anda (contoh: `AbCdEfGhIjKlMnOp`)

---

### Step 6: Buat File Konfigurasi

Buat file baru: `src/config/emailjs.ts`

```typescript
// src/config/emailjs.ts
export const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',      // Ganti dengan Service ID Anda
  templateId: 'template_xyz789',    // Ganti dengan Template ID Anda
  publicKey: 'AbCdEfGhIjKlMnOp',    // Ganti dengan Public Key Anda
};
```

**⚠️ PENTING:** Tambahkan file ini ke `.gitignore` jika tidak ingin public:
```
# .gitignore
src/config/emailjs.ts
```

Atau lebih baik, pakai environment variables:

```typescript
// src/config/emailjs.ts
export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};
```

Lalu tambahkan di `.env.local`:
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```

---

### Step 7: Update App.tsx

Ganti fungsi `handleContactSubmit` di `App.tsx`:

```typescript
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config/emailjs';

// ... di dalam component App()

const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!contactName || !contactEmail || !contactMessage) return;

  try {
    // Kirim email via EmailJS
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        from_name: contactName,
        from_email: contactEmail,
        message: contactMessage,
      },
      EMAILJS_CONFIG.publicKey
    );

    // Sukses
    setFormSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');

    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);

  } catch (error) {
    console.error('Error sending email:', error);
    alert('Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.');
  }
};
```

---

### Step 8: Tambahkan Loading State (Opsional tapi Recommended)

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!contactName || !contactEmail || !contactMessage) return;

  setIsSubmitting(true); // Mulai loading

  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        from_name: contactName,
        from_email: contactEmail,
        message: contactMessage,
      },
      EMAILJS_CONFIG.publicKey
    );

    setFormSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');

    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);

  } catch (error) {
    console.error('Error sending email:', error);
    alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
  } finally {
    setIsSubmitting(false); // Stop loading
  }
};
```

Update button submit:

```tsx
<button
  type="submit"
  disabled={isSubmitting || !contactName || !contactEmail || !contactMessage}
  className="w-full bg-secondary text-on-secondary font-label text-sm uppercase font-black px-8 py-4 border-3 border-on-surface neubrutal-shadow-lg neubrutal-btn-active disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
</button>
```

---

### Step 9: Testing

1. Jalankan dev server: `npm run dev`
2. Buka `http://localhost:3000`
3. Scroll ke form contact
4. Isi form dan klik **"Kirim Pesan"**
5. Cek email Anda (kadang masuk spam di awal)

---

### Step 10: Hapus LocalStorage Logic (Opsional)

Setelah EmailJS berjalan, Anda bisa:
1. Hapus semua logic `localStorage` di `handleContactSubmit`
2. Hapus komponen `InboxTray` (atau biarkan untuk backup)
3. Hapus state `refreshInbox` dan `setRefreshInbox`

---

## 🎯 Hasil Akhir

✅ Setiap pengunjung submit form → **Email langsung masuk inbox Anda**  
✅ Notifikasi real-time di email/HP  
✅ Data tersimpan di EmailJS dashboard  
✅ Gratis hingga 200 email/bulan  

---

## 🔧 Troubleshooting

### Email tidak masuk?

1. **Cek spam folder** di email Anda
2. **Cek EmailJS dashboard** → Statistics → lihat apakah email terkirim
3. **Cek console browser** → lihat error message
4. **Pastikan Service ID, Template ID, Public Key benar**

### Error 401 Unauthorized?

- Public Key salah atau belum di-copy dengan benar
- Coba regenerate Public Key di EmailJS dashboard

### Error 403 Forbidden?

- Service belum aktif
- Email template belum di-save
- Rate limit tercapai (tunggu beberapa menit)

---

## 📚 Resources

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS React Guide: https://www.emailjs.com/docs/examples/reactjs/
- EmailJS Dashboard: https://dashboard.emailjs.com/

---

**Selamat! Sekarang portfolio Anda sudah bisa menerima email langsung!** 🚀
