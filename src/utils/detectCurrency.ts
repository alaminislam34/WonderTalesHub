export type Currency = 'USD' | 'EUR' | 'GBP'

const STORAGE_KEY = 'preferred_currency'

// Country code → currency mapping
const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
    // GBP
    GB: 'GBP',
    // EUR — Eurozone
    AT: 'EUR', BE: 'EUR', CY: 'EUR', EE: 'EUR', FI: 'EUR',
    FR: 'EUR', DE: 'EUR', GR: 'EUR', IT: 'EUR', LV: 'EUR',
    LT: 'EUR', LU: 'EUR', MT: 'EUR', NL: 'EUR', PT: 'EUR',
    SK: 'EUR', SI: 'EUR', ES: 'EUR', HR: 'EUR', IE: 'EUR',
    // Non-EU Euro users
    AD: 'EUR', MC: 'EUR', SM: 'EUR', VA: 'EUR', ME: 'EUR', XK: 'EUR',
}

// Extract country from navigator.language (e.g. "en-GB" → "GB")
function getCountryFromLocale(): string | null {
    const lang = navigator.language || (navigator as any).userLanguage || 'en-US'
    const parts = lang.split('-')
    if (parts.length === 2 && parts[1].length === 2) {
        return parts[1].toUpperCase()
    }
    return null
}

// Instant detection from browser locale
function detectFromLocale(): Currency | null {
    const country = getCountryFromLocale()
    if (!country) return null
    return COUNTRY_TO_CURRENCY[country] ?? null
}

// Async detection via IP geolocation (fallback)
async function detectFromIP(): Promise<Currency | null> {
    try {
        const res = await fetch('https://ipapi.co/json/')
        if (!res.ok) return null
        const data = await res.json()
        const code = data?.country_code as string | undefined
        if (!code) return null
        return COUNTRY_TO_CURRENCY[code] ?? null
    } catch {
        return null
    }
}

/**
 * Detects user currency with priority:
 * 1. localStorage (user's previous choice)
 * 2. Browser locale (instant)
 * 3. IP geolocation (async fallback)
 * 4. USD (default)
 */
export async function detectUserCurrency(): Promise<{
    currency: Currency
    source: 'storage' | 'locale' | 'ip' | 'default'
}> {
    // 1. Persisted choice
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY) as Currency | null
        if (stored && ['USD', 'EUR', 'GBP'].includes(stored)) {
            return { currency: stored, source: 'storage' }
        }
    }

    // 2. Browser locale
    const fromLocale = detectFromLocale()
    if (fromLocale) return { currency: fromLocale, source: 'locale' }

    // 3. IP geolocation
    const fromIP = await detectFromIP()
    if (fromIP) return { currency: fromIP, source: 'ip' }

    // 4. Default
    return { currency: 'USD', source: 'default' }
}

export function saveCurrencyPreference(currency: Currency) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, currency)
    }
}