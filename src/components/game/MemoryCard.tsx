import React from 'react';

interface MemoryCardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function MemoryCard({ image, isFlipped, isMatched, onClick }: MemoryCardProps) {
  return (
    <div
      className="relative aspect-[3/4] cursor-pointer group h-32 w-24 sm:h-40 sm:w-32"
      onClick={!isFlipped && !isMatched ? onClick : undefined}
    >
      <div
        className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped || isMatched ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Card Back (Face down) */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-rose-400 to-pink-600 rounded-xl border-2 border-white/30 flex items-center justify-center shadow-lg hover:shadow-pink-500/50 transition-shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8 opacity-80"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>

        {/* Card Front (Face up - Image) */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-xl overflow-hidden border-2 border-white/50 shadow-xl">
          <img 
            src={image} 
            alt="Memory" 
            className="w-full h-full object-cover" 
          />
          {isMatched && (
            <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center animate-pulse">
              <span className="text-4xl filter drop-shadow-lg">✨</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
