import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MemoryCard } from '../../components/game/MemoryCard';

import img1 from '../../assets/memories/aloy.jpeg';
import img2 from '../../assets/memories/aloy2.jpeg';
import img3 from '../../assets/memories/aloy3.jpeg';
import img4 from '../../assets/memories/aloy4.jpeg';
import img5 from '../../assets/memories/aloy5.jpeg';
import img6 from '../../assets/memories/aloy6.jpeg';
import img7 from '../../assets/memories/aloy7.jpeg';
import img8 from '../../assets/memories/aloy8.jpeg';
import img9 from '../../assets/memories/aloy9.jpeg';

const PHOTO_URLS = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

interface Card {
  id: number;
  imageId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Duplicate photos to create pairs
    const pairs = [...PHOTO_URLS, ...PHOTO_URLS].map((url, index) => ({
      id: index,
      imageId: index % PHOTO_URLS.length,
      image: url,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleCardClick = (index: number) => {
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsProcessing(true);
      checkForMatch(newFlippedIndices, newCards);
    }
  };

  const checkForMatch = (indices: number[], currentCards: Card[]) => {
    const [firstIndex, secondIndex] = indices;
    const isMatch = currentCards[firstIndex].imageId === currentCards[secondIndex].imageId;

    if (isMatch) {
      setTimeout(() => {
        const newCards = [...currentCards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setIsProcessing(false);
        checkWin(newCards);
      }, 500);
    } else {
      setTimeout(() => {
        const newCards = [...currentCards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
        setFlippedIndices([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const checkWin = (currentCards: Card[]) => {
    if (currentCards.every((card) => card.isMatched)) {
      setTimeout(() => {
        navigate('/welcome');
      }, 1500);
    }
  };

  // --- ANIMATION STYLES ---
  const animationStyles = `
    @keyframes popIn {
      0% { 
        opacity: 0; 
        transform: scale(0.5) translateY(20px); 
      }
      100% { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    @keyframes slideDown {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .animate-pop-in {
      animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    }

    .animate-slide-down {
      animation: slideDown 0.8s ease-out forwards;
    }
  `;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(157, 23, 77, 0.8), rgba(157, 23, 77, 0.9)), url('https://images.unsplash.com/photo-1542038784456-1ea0e93ca91b?q=80&w=1920') center/cover no-repeat fixed`
      }}
    >
      <style>{animationStyles}</style>

      {/* Background decorations */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(244, 63, 94, 0.4) 0%, transparent 60%)`,
        }}
      />

      <div className="z-10 text-center mb-8 animate-slide-down">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          Match the pairs to proceed ❤️
        </h1>
      </div>

      <div className="z-10 grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="animate-pop-in"
            style={{ 
              // Stagger the animation: each card appears 100ms after the previous one
              animationDelay: `${index * 100}ms` 
            }}
          >
            <MemoryCard
              {...card}
              onClick={() => handleCardClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}