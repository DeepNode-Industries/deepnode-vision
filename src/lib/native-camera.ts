/**
 * Native camera / file picker — wraps expo-image-picker and expo-document-picker.
 * Returns File-compatible objects for use with the vision engine.
 */
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as Haptics from 'expo-haptics'

export interface NativeAsset {
  uri: string
  name: string
  size: number
  type: string
}

/** Open native camera to capture a photo */
export async function takePicture(): Promise<NativeAsset | null> {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

  const permission = await ImagePicker.requestCameraPermissionsAsync()
  if (!permission.granted) return null

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.88,
    allowsEditing: false,
    exif: false,
  })

  if (result.canceled || !result.assets[0]) return null

  const asset = result.assets[0]
  return {
    uri: asset.uri,
    name: `photo_${Date.now()}.jpg`,
    size: asset.fileSize ?? 500_000,
    type: asset.mimeType ?? 'image/jpeg',
  }
}

/** Open native photo library */
export async function pickFromGallery(): Promise<NativeAsset | null> {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (!permission.granted) return null

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.88,
    allowsEditing: false,
    exif: false,
  })

  if (result.canceled || !result.assets[0]) return null

  const asset = result.assets[0]
  return {
    uri: asset.uri,
    name: asset.fileName ?? `image_${Date.now()}.jpg`,
    size: asset.fileSize ?? 300_000,
    type: asset.mimeType ?? 'image/jpeg',
  }
}

/** Open document picker (PDF / any file) */
export async function pickDocument(): Promise<NativeAsset | null> {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

  const result = await DocumentPicker.getDocumentAsync({
    type: ['image/*', 'application/pdf'],
    copyToCacheDirectory: true,
  })

  if (result.canceled || !result.assets[0]) return null

  const asset = result.assets[0]
  return {
    uri: asset.uri,
    name: asset.name,
    size: asset.size ?? 200_000,
    type: asset.mimeType ?? 'application/octet-stream',
  }
}

/**
 * Convert a NativeAsset to a File object for the vision engine.
 * The vision engine only reads .name, .size, .type — no actual file read.
 */
export function nativeAssetToFile(asset: NativeAsset): File {
  return {
    name: asset.name,
    size: asset.size,
    type: asset.type,
    // Minimal stubs — vision engine never reads file bytes in simulation mode
    lastModified: Date.now(),
    arrayBuffer: async () => new ArrayBuffer(0),
    text: async () => '',
    slice: () => new Blob(),
    stream: () => new ReadableStream(),
    webkitRelativePath: '',
  } as unknown as File
}

/** Light haptic tap */
export async function hapticTap(): Promise<void> {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
}
