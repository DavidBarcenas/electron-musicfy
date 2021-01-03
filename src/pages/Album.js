import React from 'react';
import { useParams } from 'react-router-dom';

export const Album = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Album</h1>
    </div>
  );
};
