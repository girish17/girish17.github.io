import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Photo {
  url: string
  thumbnail?: string
  title: string
  description: string
}

interface PhotoCategory {
  id: string
  title: string
  photos: Photo[]
}

const photoCategories: PhotoCategory[] = [
  {
    id: 'machine',
    title: 'Machine',
    photos: [
      {
        url: '/assets/img/desktopRevive.jpeg',
        title: 'Computer setup from 2019',
        description: 'A Libreboot X200s laptop connected to vertical display (DELL U2412M) and desktop (GA-MA785GMT-US2H) to horizontal display (DELL U2412M).'
      },
      {
        url: '/assets/img/workspacePic.jpg',
        thumbnail: '/assets/img/workspacePicCompressed.jpg',
        title: 'Workspace and setup from 2020',
        description: 'Libreboot X200s and two Dell U2412M monitors.'
      },
      {
        url: '/assets/img/workspace.jpg',
        title: 'Setup from 2021',
        description: 'Libreboot X200s, Dell Latitude E6430, and two Dell U2412M monitors.'
      },
      {
        url: '/assets/img/godMode.jpg',
        title: 'Just to spice things up!',
        description: 'Switching to God mode...'
      }
    ]
  },
  {
    id: 'flora',
    title: 'Flora',
    photos: [
      {
        url: '/assets/img/pothos.jpg',
        title: 'Epipremnum aureum',
        description: 'Money Plant'
      },
      {
        url: '/assets/img/jade.jpg',
        title: 'Crassula ovata',
        description: 'Jade Plant'
      },
      {
        url: '/assets/img/luckyBamboo.jpg',
        title: 'Dracaena sanderiana',
        description: 'Lucky Bamboo'
      },
      {
        url: '/assets/img/syngonium.jpg',
        title: 'Syngonium podophyllum',
        description: 'Arrowhead plant'
      }
    ]
  },
  {
    id: 'fauna',
    title: 'Fauna',
    photos: [
      {
        url: '/assets/img/starFish.jpg',
        thumbnail: '/assets/img/starFishCompressed.jpg',
        title: 'Asterias rubens',
        description: 'Starfish'
      },
      {
        url: '/assets/img/pup.jpg',
        thumbnail: '/assets/img/pupCompressed.jpg',
        title: 'Canis familiaris',
        description: 'Dog'
      },
      {
        url: '/assets/img/meself.jpeg',
        title: "That's me!",
        description: 'Photo created using Cheese application for GNOME.'
      }
    ]
  },
  {
    id: 'mandalas',
    title: 'Mandalas',
    photos: [
      { url: '/assets/img/mandalaColoring0.jpg', thumbnail: '/assets/img/mandalaColoring0Compressed.jpg', title: 'Mandala 1', description: 'Colored using Faber Castell 12 Colour pencils.' },
      { url: '/assets/img/mandalaColoring1.jpg', thumbnail: '/assets/img/mandalaColoring1Compressed.jpg', title: 'Mandala 2', description: 'Colored using Faber Castell 12 Colour pencils.' },
      { url: '/assets/img/mandalaColoring2.jpg', thumbnail: '/assets/img/mandalaColoring2Compressed.jpg', title: 'Mandala 3', description: 'Colored using Faber Castell 12 Colour pencils.' },
      { url: '/assets/img/mandalaColoring3.jpg', thumbnail: '/assets/img/mandalaColoring3Compressed.jpg', title: 'Mandala 4', description: 'Colored using Faber Castell 12 Colour pencils.' },
      { url: '/assets/img/mandalaColoring4.jpg', thumbnail: '/assets/img/mandalaColoring4Compressed.jpg', title: 'Mandala 5', description: 'Colored using Faber Castell 12 Colour pencils.' },
      { url: '/assets/img/mandalaColoring5.jpg', title: 'Mandala 6', description: 'Colored using Faber Castell 12 Colour pencils.' },
      { url: '/assets/img/mandalaColoring6.jpg', title: 'Mandala 7', description: 'Colored using Faber Castell 12 Colour pencils.' },
      { url: '/assets/img/mandalaColoring7.jpg', title: 'Mandala 8', description: 'Colored using Faber Castell 12 Colour pencils.' }
    ]
  },
  {
    id: 'paintings',
    title: 'Water Color Paintings',
    photos: [
      {
        url: '/assets/img/painting0.jpg',
        title: 'Painting 1',
        description: 'Painted on a Monday morning.'
      },
      {
        url: '/assets/img/painting1.jpg',
        title: 'Painting 2',
        description: 'Painted on a Monday morning.'
      },
      {
        url: '/assets/img/painting2.jpg',
        title: 'Painting 3',
        description: 'Painted on a Monday morning.'
      }
    ]
  }
]

export default function Photos() {
  const [openCategories, setOpenCategories] = useState<string[]>(photoCategories.map(c => c.id))
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Photos
      </motion.h1>
      
      <div className="space-y-12">
        {photoCategories.map((category) => (
          <section key={category.id}>
            <button 
              onClick={() => toggleCategory(category.id)}
              className="flex items-center gap-3 text-2xl font-bold mb-6 text-slate-100 hover:text-cyan-400 transition-colors group"
            >
              <span className={`text-cyan-500 transform transition-transform duration-300 ${openCategories.includes(category.id) ? 'rotate-90' : ''}`}>
                ▶
              </span>
              {category.title}
              <span className="text-sm font-normal text-slate-500 ml-2">({category.photos.length})</span>
            </button>
            
            <AnimatePresence>
              {openCategories.includes(category.id) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {category.photos.map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group-hover:border-cyan-500/50 transition-all duration-300">
                        <img 
                          src={photo.thumbnail || photo.url} 
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">{photo.title}</h3>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{photo.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-4xl z-50"
              onClick={() => setSelectedPhoto(null)}
            >
              ×
            </button>
            <div className="max-w-6xl w-full flex flex-col items-center">
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedPhoto.url} 
                alt={selectedPhoto.title}
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-white">{selectedPhoto.title}</h2>
                <p className="text-slate-400 mt-2 max-w-2xl">{selectedPhoto.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
