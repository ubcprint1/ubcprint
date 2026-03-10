export interface Location {
  latitude: number
  longitude: number
}

// موقع المطبعة: https://maps.app.goo.gl/oQWu9xBG5H4BzXYLA
export const PRINT_SHOP_LOCATION: Location = {
  latitude: 30.0444, // تحديث بالإحداثيات الفعلية من الرابط
  longitude: 31.2357, // تحديث بالإحداثيات الفعلية من الرابط
}

export const MAX_DISTANCE_METERS = 100

// حساب المسافة بين موقعين باستخدام Haversine formula
export function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371e3 // نصف قطر الأرض بالأمتار
  const φ1 = (loc1.latitude * Math.PI) / 180
  const φ2 = (loc2.latitude * Math.PI) / 180
  const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180
  const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // المسافة بالأمتار
}

export function isWithinRange(userLocation: Location): boolean {
  const distance = calculateDistance(userLocation, PRINT_SHOP_LOCATION)
  return distance <= MAX_DISTANCE_METERS
}

export async function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('خدمة تحديد الموقع غير متوفرة في هذا المتصفح'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        reject(new Error('فشل في الحصول على الموقع: ' + error.message))
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  })
}
