import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingSystemProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const RatingSystem: React.FC<RatingSystemProps> = ({
  initialRating = 0,
  onRatingChange,
  readonly = false,
  size = 'md'
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleRatingClick = (newRating: number) => {
    if (readonly) return;
    setRating(newRating);
    onRatingChange?.(newRating);
  };

  const handleMouseEnter = (starRating: number) => {
    if (readonly) return;
    setHoveredRating(starRating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((starRating) => (
        <button
          key={starRating}
          type="button"
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          onClick={() => handleRatingClick(starRating)}
          onMouseEnter={() => handleMouseEnter(starRating)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          aria-label={`Rate ${starRating} star${starRating !== 1 ? 's' : ''}`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              starRating <= displayRating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } transition-colors`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating > 0 ? `${rating}/5` : 'Not rated'}
      </span>
    </div>
  );
};

export default RatingSystem;