// Perkecil foto sebelum disimpan (maks 800px, JPEG) agar ringan di proyektor & HP.
export function resizeImage(file, maxSize = 800, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Gagal membaca file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('File bukan gambar yang valid'))
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => (blob ? resolve({ blob, dataUrl: canvas.toDataURL('image/jpeg', quality) }) : reject(new Error('Gagal memproses gambar'))),
          'image/jpeg',
          quality,
        )
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
