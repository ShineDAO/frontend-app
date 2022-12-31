import React from 'react';
import styles from "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__header">
        <div className="skeleton-card__avatar" />
        <div className="skeleton-card__title" />
      </div>
      <div className="skeleton-card__body">
        <div className="skeleton-card__description" />
        <div className="skeleton-card__description" />
      </div>
      <div className="skeleton-card__body">
        <div className="skeleton-card__description" />
        <div className="skeleton-card__description" />
      </div>
      
    </div>
  );
};

export default SkeletonCard;
