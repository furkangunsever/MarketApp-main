# ElAkce - Market Fiyat Karsilastirma Uygulamasi

ElAkce, kullanicilarin farkli marketlerdeki urun fiyatlarini karsilastirmasini kolaylastiran bir React Native mobil uygulamasidir. Uygulama; urun arama, favorilere ekleme, urun detayi/fiyat karsilastirma, Firebase tabanli kimlik dogrulama ve chatbot destegi gibi ozellikler sunar.

## Proje Ozet

- **Platform:** React Native (Android ve iOS)
- **Navigasyon:** React Navigation (Native Stack)
- **Kimlik Dogrulama:** Firebase Authentication
- **Veri Katmani:** Firebase Firestore + harici REST API
- **Lokal Veri Saklama:** AsyncStorage (favoriler)
- **Diger:** Push Notification ve sohbet (chatbot) altyapisi

## Ana Ozellikler

- E-posta/sifre ile kayit olma ve giris yapma
- Profil ve ayarlar ekranlari
- Market bazli urun listeleri (Migros, Misas, A101, Sok)
- Kategori odakli listeleme (abur cubur, icecek, donuk urun, et-balik-tavuk)
- Tum urunler icinde arama ve filtreleme
- Favorilere urun ekleme/cikarma ve favorileri yerel olarak saklama
- Urun detayinda benzer urunleri farkli marketlerden cekip fiyat karsilastirma
- Chat ekranindan harici API ile soru-cevap alma

## Teknoloji Yigini

### Temel Kutuphaneler

- `react-native` `0.73.11`
- `react` `18.2.0`
- `@react-navigation/native` ve `@react-navigation/native-stack`
- `@react-native-firebase/app`, `@react-native-firebase/auth`, `@react-native-firebase/firestore`
- `@react-native-async-storage/async-storage`
- `react-native-vector-icons`

### Proje Mimarisi (Klasor Yapisi)

```text
MarketApp-main/
|- src/
|  |- assets/          # ikonlar ve gorseller
|  |- components/      # tekrar kullanilabilir UI bilesenleri
|  |- contexts/        # global state/context (FavoriteContext)
|  |- routes/          # navigation tanimlari
|  |- screens/         # ekranlar (work1...work21)
|- android/            # Android platform dosyalari
|- ios/                # iOS platform dosyalari
|- index.js            # uygulama giris noktasi
|- package.json
```

## Kurulum

### 1) Gereksinimler

- Node.js `>= 18`
- npm veya yarn
- React Native gelistirme ortami
  - Android Studio (Android)
  - Xcode (iOS - macOS)

Detayli kurulum: [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

### 2) Bagimliliklari yukle

```bash
npm install
```

### 3) Firebase yapilandirmasi

Bu projede Firebase Authentication ve Firestore kullanilmaktadir.

- Android icin `android/app/google-services.json` dosyasi gereklidir.
- iOS icin gerekli Firebase dosyalari/profil ayarlari yapilandirilmalidir.
- Firebase projesinde `users` koleksiyonu uzerinden kullanici bilgileri tutulur.

### 4) API endpointlerini guncelle

Projede bazi ekranlarda lokal ag IP'sine sabitlenmis endpointler bulunur. Kendi backend adresinize gore guncelleyin:

- `src/screens/work2/SearchPage.js`
- `src/screens/work15/HomePageDetail.js`
- `src/screens/work19/ChatBot.js`

Ornek endpointler:
- `http://<IP>:5001/tum_urunler`
- `http://<IP>:5001/api/get-response`

### 5) Uygulamayi calistir

Metro:

```bash
npm start
```

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

## Kullanilabilir Scriptler

- `npm start` - Metro bundler baslatir
- `npm run android` - Android uygulamasini calistirir
- `npm run ios` - iOS uygulamasini calistirir
- `npm run lint` - ESLint calistirir
- `npm test` - Jest testlerini calistirir

## Dikkat Edilmesi Gerekenler

- API URL'leri kod icinde hardcoded oldugu icin farkli aglarda manuel guncelleme gerekir.
- Favori urunler `AsyncStorage` icinde `likedProducts` anahtari ile tutulur.
- Giris sonrasi ana ekrana yonlendirme `src/routes/Navigation.js` icindeki stack akisi ile yonetilir.

## Gelistirme Onerileri

- API adreslerini `.env` yapisina tasiyarak ortam bazli yonetim saglanabilir.
- Ekran adlarinda daha acik ve tutarli isimlendirme ile bakim kolaylastirilabilir.
- Test kapsami; auth akisi, urun filtreleme ve favori senaryolari icin genisletilebilir.
