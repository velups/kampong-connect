import React from 'react';
import { User } from 'lucide-react';
import RatingSystem from './RatingSystem';
import { Review } from '../types';

interface ReviewDisplayProps {
  reviews: Review[];
  title?: string;
}

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({
  reviews,
  title = "Reviews"
}) => {
  if (reviews.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-8">No reviews yet</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="text-center">
          <div className="flex items-center space-x-2">
            <RatingSystem initialRating={averageRating} readonly size="sm" />
            <span className="text-sm text-gray-600">
              ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">Anonymous</span>
                  <span className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2">
                  <RatingSystem initialRating={review.rating} readonly size="sm" />
                </div>
                {review.comment && (
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDisplay;