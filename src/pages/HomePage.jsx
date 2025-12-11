import { useNavigate } from 'react-router-dom'

const images = [
    { id: 1, src: '/Photo frame copy_1.png', name: 'Frame 1' },
]

function HomePage({ onSelectImage }) {
    const navigate = useNavigate()

    const handleSelect = (image) => {
        onSelectImage(image)
        navigate('/name')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose Your Frame
            </h1>
            <p className="text-gray-400 mb-12 text-lg">Select a photo frame to get started</p>

            <div className="flex justify-center gap-8 max-w-4xl">
                {images.map((image) => (
                    <div
                        key={image.id}
                        onClick={() => handleSelect(image)}
                        className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gray-800/50 p-4 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                    >
                        <img
                            src={image.src}
                            alt={image.name}
                            className="w-full h-80 object-contain rounded-xl"
                        />
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                {image.name}
                            </h3>
                            <p className="text-gray-500 mt-1">Click to select</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage
