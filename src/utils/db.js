import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set, get, onValue } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isConfigured = !!import.meta.env.VITE_FIREBASE_DATABASE_URL

let db = null
if (isConfigured) {
  const app = initializeApp(firebaseConfig)
  db = getDatabase(app)
}

export function subscribeEntries(callback) {
  if (!db) {
    callback([])
    return () => {}
  }
  const entriesRef = ref(db, 'entries')
  return onValue(entriesRef, (snapshot) => {
    const val = snapshot.val()
    callback(val ? Object.values(val) : [])
  })
}

export async function saveEntry(entry) {
  if (!db) return
  const entriesRef = ref(db, 'entries')
  const snapshot = await get(entriesRef)

  if (snapshot.exists()) {
    let existingKey = null
    snapshot.forEach(child => {
      if (child.val().name === entry.name) {
        existingKey = child.key
      }
    })
    if (existingKey) {
      await set(ref(db, `entries/${existingKey}`), entry)
      return
    }
  }

  await push(entriesRef, entry)
}
