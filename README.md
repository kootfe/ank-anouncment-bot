# Discord Bildiri Botu
Node.JS + Express Backend ile Discord'a 1 endpoint(`/anc`) üzerinden bildiri gönderme.

> Yazılımcı bey’e not: Ne yazık ki networking konusunda kötüyüm. O yüzden güvenlik (sadece anikagai üzerinden erişim) ellerinizden öper.

## Kurulum
1. Gereksinimler
    - Node.js v18+
    - npm ya da yarn
    - Discord bot tokeni (Burada verilmiş)

2. Gereksinimleri indirmek:
```bash
npm install
```

3. Ortam değişkenleri
```env
TOKEN=BOT_TOKEN
EP_ID=DISCORD_BOLUM_UYARISI_ICIN_KANAL_IDSI
SERIE_ID=DISCORD_SERI_UYARISI_ICIN_KANAL_IDSI
PORT=SUNUCU_HEDEF_PORT
SEC_TOKEN=SADECE_TAKIN_ICIN_GUVENLIK_TOKENI
```

## Calıştırma
```bash
node httpAPI.js
```
> klasördeki diğer dosya, httpsAPI.js ile direkt https üstünden sunulabilir ama NGINX, Caddy gibi uygulamalar ile Node HTTP sunarken HTTPS almak daha iyi

- Bota giriş yapmasını bekle (Uyarıyor)
- API "http:<serer-ip>:<port>" adresini dinliyor

## API Uç Noktası
POST `/anc`
Seri ve bölümler için tek üç nokta 

HTTP POST isteği (JSON)
```http
POST /anc HTTP/1.1
Host: <server-ip>:<port>
Authorization: Bearer <SEC_TOKEN>
Content-Type: application/json

{ 
    "type": "ep" | "ser", //Bölüm için "ep" seri için "ser"
    "title": "Başlık",
    "desc": "Açıklama",
    "thumbnail": "Thumbnail'e giden link",
    "url": "Bölüm URL'si",
}
```

## HTTPS İçin Notlar
- Dosyada key.pem ve cert.pem bulunmak zorunda
