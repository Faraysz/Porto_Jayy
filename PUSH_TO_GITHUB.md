# 🚀 Cara Push ke GitHub

## ✅ Status Saat Ini

Git repository sudah diinisialisasi dan commit pertama sudah dibuat!

```
✅ git init - Done
✅ git add . - Done  
✅ git commit - Done
⏳ git remote add origin - Pending (butuh URL GitHub)
⏳ git push - Pending
```

---

## 📝 Langkah Selanjutnya

### Step 1: Buat Repository di GitHub

1. Buka: **https://github.com/new**
2. Isi form:
   - **Repository name:** `porto-atmajaya` (atau nama lain)
   - **Description:** Portfolio website Atmajaya - Neubrutalism Design
   - **Public** atau **Private** (pilih sesuai keinginan)
   - ⚠️ **JANGAN centang** "Add a README file" 
   - ⚠️ **JANGAN pilih** .gitignore atau license (sudah ada di project)
3. Klik **"Create repository"**

---

### Step 2: Copy URL Repository

Setelah repository dibuat, GitHub akan menampilkan halaman dengan instruksi. Copy **URL HTTPS** repository Anda.

Contoh URL:
```
https://github.com/username/porto-atmajaya.git
```

---

### Step 3: Jalankan Command Berikut

Ganti `<URL_REPO>` dengan URL repository yang Anda copy:

```bash
# Tambahkan remote origin
git remote add origin <URL_REPO>

# Push ke GitHub
git push -u origin master
```

**Contoh lengkap:**
```bash
git remote add origin https://github.com/atmajaya/porto-atmajaya.git
git push -u origin master
```

---

### Step 4: Login GitHub (Jika Diminta)

Jika diminta login, Anda punya 2 opsi:

#### Opsi A: GitHub CLI (gh) - Recommended
```bash
# Install GitHub CLI dulu jika belum
# Windows: winget install --id GitHub.cli

# Login
gh auth login

# Setelah login, push lagi
git push -u origin master
```

#### Opsi B: Personal Access Token (PAT)

1. Buka: **https://github.com/settings/tokens**
2. Klik **"Generate new token (classic)"**
3. Beri nama: `Portfolio Push Token`
4. Centang scope: `repo` (full control)
5. Generate & copy token
6. Saat diminta password di terminal, paste **token** (bukan password GitHub)

---

## 🔄 Untuk Update Selanjutnya

Setelah setup awal, untuk push perubahan baru:

```bash
git add .
git commit -m "Pesan commit Anda"
git push
```

---

## 📌 Tips

### Cek status git:
```bash
git status
```

### Lihat remote yang terdaftar:
```bash
git remote -v
```

### Ganti branch dari master ke main (opsional, GitHub default sekarang main):
```bash
git branch -M main
git push -u origin main
```

---

## ⚠️ Catatan Penting

1. File `.env` sudah di-ignore otomatis (tidak akan ke-push)
2. File `node_modules/` tidak akan ke-push (sudah di .gitignore)
3. Pastikan tidak ada API key atau password di file yang di-push

---

## 🆘 Troubleshooting

### Error: "Support for password authentication was removed"
**Solusi:** Gunakan Personal Access Token (PAT) bukan password

### Error: "failed to push some refs"
**Solusi:** 
```bash
git pull origin master --rebase
git push -u origin master
```

### Error: "remote origin already exists"
**Solusi:**
```bash
git remote remove origin
git remote add origin <URL_BARU>
```

---

**Setelah berhasil push, beri tahu saya URL GitHub repository Anda!** 🎉
