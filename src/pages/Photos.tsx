import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mandalaImages = [
  'mandalaColoring0.jpg',
  'mandalaColoring1.jpg',
  'mandalaColoring2.jpg',
  'mandalaColoring3.jpg',
  'mandalaColoring4.jpg',
  'mandalaColoring5.jpg',
  'mandalaColoring6.jpg',
  'mandalaColoring7.jpg',
]

export default function Photos() {
  const [showMandalas, setShowMandalas] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Photos
      </motion.h1>
      
      <section>
        <button 
          onClick={() => setShowMandalas(!showMandalas)}
          className="flex items-center gap-2 text-xl font-semibold mb-6 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span className={`transform transition-transform duration-300 ${showMandalas ? 'rotate-90' : ''}`}>▶</span>
          Mandalas ({mandalaImages.length})
        </button>
        
        <AnimatePresence>
          {showMandalas && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {mandalaImages.map((img, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedImage(`/assets/img/${img}`)}
                  className="aspect-square rounded-xl overflow-hidden hover:ring-2 hover:ring-cyan-500 transition-all group"
                >
                  <img 
                    src={`/assets/img/${img}`} 
                    alt={`Mandala ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white text-4xl hover:text-cyan-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage} 
              alt="Full size"
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
