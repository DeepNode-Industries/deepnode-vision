/**
 * Native camera helpers for Capacitor Android/iOS.
 * Falls back gracefully on web — callers must trigger HTML <input> instead.
 */

/** Returns true when running inside a Capacitor native app */
export async function isNativePlatform(): Promise<boolean> {
  if (typeof window === 'undefined') return false
  try {
    const { Capacitor } = await import('@capacitor/core')
    return Capacitor.isNativePlatform()
  } catch {
    return false
  }
}

/** Request camera + photo library permissions. Call once before first use. */
export async function requestCameraPermissions(): Promise<boolean> {
  try {
    const { Camera } = await import('@capacitor/camera')
    const status = await Camera.requestPermissions({ permissions: ['camera', 'photos'] })
    return status.camera === 'granted' && status.photos !== 'denied'
  } catch {
    return false
  }
}

/**
 * Open the native camera and return the captured image as a File.
 * Returns null if user cancels or if an error occurs.
 */
export async function takePicture(): Promise<File | null> {
  try {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera')
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics')

    await Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {})

    const photo = await Camera.getPhoto({
      quality: 88,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: false,
      presentationStyle: 'fullscreen',
      correctOrientation: true,
    })

    return await uriToFile(photo.webPath, 'photo')
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    // Suppress user-cancel noise
    if (!msg.includes('cancel') && !msg.includes('dismissed')) {
      console.error('[DeepNode] Camera error:', e)
    }
    return null
  }
}

/**
 * Open the native photo library and return the selected image as a File.
 * Returns null if user cancels or if an error occurs.
 */
export async function pickFromGallery(): Promise<File | null> {
  try {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera')
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics')

    await Haptics.impact({ style: ImpactStyle.Light }).catch(() => {})

    const photo = await Camera.getPhoto({
      quality: 88,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      correctOrientation: true,
    })

    return await uriToFile(photo.webPath, 'image')
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    if (!msg.includes('cancel') && !msg.includes('dismissed')) {
      console.error('[DeepNode] Gallery error:', e)
    }
    return null
  }
}

/** Light haptic tap — use on important button presses for native feel */
export async function hapticTap(): Promise<void> {
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics')
    await Haptics.impact({ style: ImpactStyle.Light })
  } catch {}
}

// ─── helpers ──────────────────────────────────────────────────────────────────

async function uriToFile(webPath: string | undefined, prefix: string): Promise<File | null> {
  if (!webPath) return null
  const response = await fetch(webPath)
  const blob = await response.blob()
  const ext = blob.type === 'image/png' ? 'png' : 'jpg'
  return new File([blob], `${prefix}_${Date.now()}.${ext}`, { type: blob.type || 'image/jpeg' })
}
