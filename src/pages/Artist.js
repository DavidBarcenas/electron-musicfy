import React from 'react';
import { useParams } from 'react-router-dom';

export const Artist = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1>Artist</h1>
    </div>
  );
};
