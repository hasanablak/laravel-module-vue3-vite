async function loadLocaleMessages(locale) {
	const baseCacheKey = 'localeLanguages';
	const cacheTimeout = 30 * 60 * 1000; // 30 dakika
	
	// Her locale için ayrı cache key oluştur
	const cacheKey = `${baseCacheKey}_${locale}`;
	const timestampKey = `${cacheKey}_timestamp`;
	
	// Cache kontrolü
	const cachedData = localStorage.getItem(cacheKey);
	const cacheTimestamp = localStorage.getItem(timestampKey);
	
	const now = Date.now();
	const lastCached = cacheTimestamp ? parseInt(cacheTimestamp) : 0;
	const isCacheValid = cachedData && (now - lastCached < cacheTimeout);
	
	// Eğer cache varsa hemen döndür
	if (isCacheValid) {
		const cachedResult = JSON.parse(cachedData);
		
		// Cache süresi dolmuşsa arka planda güncelle
		if (now - lastCached >= cacheTimeout) {
			updateCacheInBackground(locale, cacheKey, timestampKey);
		}
		
		return cachedResult;
	}
	
	// Cache yoksa veya geçersizse yeni veri çek ve döndür
	return await fetchAndCacheMessages(locale, cacheKey, timestampKey);
}

// Yeni veri çekme ve cache'leme fonksiyonu
async function fetchAndCacheMessages(locale, cacheKey, timestampKey) {
	try {
		const response = await fetch(`/api/translations/${locale}`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const messages = await response.json();
		const result = { [locale]: messages };
		
		// Cache'e yaz
		localStorage.setItem(cacheKey, JSON.stringify(result));
		localStorage.setItem(timestampKey, Date.now().toString());
		
		return result;
	} catch (error) {
		console.error(`Translation fetch error for locale ${locale}:`, error);
		
		// Hata durumunda cache'den eski veri döndür (varsa)
		const cachedData = localStorage.getItem(cacheKey);
		if (cachedData) {
			return JSON.parse(cachedData);
		}
		
		// Hiç cache yoksa boş obje döndür
		return { [locale]: {} };
	}
}

// Arka planda cache güncelleme fonksiyonu
async function updateCacheInBackground(locale, cacheKey, timestampKey) {
	try {
		const response = await fetch(`/api/translations/${locale}`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const messages = await response.json();
		const result = { [locale]: messages };
		
		// Yeni veriyi cache'e yaz
		localStorage.setItem(cacheKey, JSON.stringify(result));
		localStorage.setItem(timestampKey, Date.now().toString());
		
		// Opsiyonel: Uygulamaya yeni verilerin geldiğini bildir
		window.dispatchEvent(new CustomEvent('localeUpdated', { 
			detail: { locale, messages: result }
		}));
		
	} catch (error) {
		console.error(`Background update failed for locale ${locale}:`, error);
		// Arka plan güncelleme hatası kritik değil
	}
}

// Kullanım örneği:
// loadLocaleMessages('en'); // İngilizce çeviriler
// loadLocaleMessages('tr'); // Türkçe çeviriler
// loadLocaleMessages('de'); // Almanca çeviriler

export default loadLocaleMessages;