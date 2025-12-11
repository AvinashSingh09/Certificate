import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import html2canvas from 'html2canvas'

function ResultPage({ selectedImage, selectedOverlay, userName }) {
    const navigate = useNavigate()
    const certificateRef = useRef(null)

    const handleStartOver = () => {
        navigate('/')
    }

    const handleDownload = async () => {
        if (certificateRef.current) {
            try {
                const canvas = await html2canvas(certificateRef.current, {
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    scale: 2
                })
                const link = document.createElement('a')
                link.download = `certificate-${userName || 'user'}.png`
                link.href = canvas.toDataURL('image/png')
                link.click()
            } catch (error) {
                console.error('Error generating image:', error)
            }
        }
    }

    const handlePrint = async () => {
        if (certificateRef.current) {
            try {
                const canvas = await html2canvas(certificateRef.current, {
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    scale: 2
                })
                const printWindow = window.open('', '_blank')
                if (printWindow) {
                    printWindow.document.write(`
                        <html>
                            <head>
                                <title>Certificate - ${userName}</title>
                                <style>
                                    body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                                    img { max-width: 100%; height: auto; }
                                    @media print { body { margin: 0; } img { width: 100%; } }
                                </style>
                            </head>
                            <body>
                                <img src="${canvas.toDataURL('image/png')}" />
                            </body>
                        </html>
                    `)
                    printWindow.document.close()
                    printWindow.onload = () => {
                        printWindow.print()
                    }
                }
            } catch (error) {
                console.error('Error printing:', error)
            }
        }
    }

    if (!selectedImage || !selectedOverlay) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
                <p className="text-white text-xl mb-4">No selections made</p>
                <button
                    onClick={handleStartOver}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                    Start Over
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Your Certificate
            </h1>
            <p className="text-gray-400 mb-8 text-lg">Here's your personalized certificate</p>

            {/* Combined result */}
            <div className="relative max-w-2xl w-full bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/50">
                <div ref={certificateRef} className="relative" style={{ backgroundColor: '#ffffff' }}>
                    {/* Base frame image */}
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.name}
                        className="w-full object-contain rounded-xl"
                        crossOrigin="anonymous"
                    />

                    {/* User's name rendered on the certificate */}
                    <div
                        className="absolute text-gray-700 font-medium pointer-events-none"
                        style={{
                            bottom: '11%',
                            left: '33%',
                            fontSize: 'clamp(10px, 2vw, 18px)',
                            fontFamily: 'Arial, sans-serif'
                        }}
                    >
                        {userName}
                    </div>

                    {/* Overlay image on top */}
                    <img
                        src={selectedOverlay.src}
                        alt={selectedOverlay.name}
                        className="absolute object-contain rounded-xl"
                        crossOrigin="anonymous"
                        style={{
                            width: '50%',
                            height: '60%',
                            bottom: '27%',
                            left: '20%',
                            transform: 'translateX(-50%)'
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                    onClick={handleDownload}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                </button>
                <button
                    onClick={handlePrint}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                </button>
                <button
                    onClick={handleStartOver}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
                >
                    Start Over
                </button>
            </div>
        </div>
    )
}

export default ResultPage
