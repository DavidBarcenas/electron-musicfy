import React, { useEffect, useState } from 'react';
import firebase from '../../utils/firebase';

export const BannerHome = () => {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref('others/banner-home.jpg')
      .getDownloadURL()
      .then((url) => setBannerUrl(url))
      .catch(() => false);
  }, []);

  if (!bannerUrl) {
    return null;
  }

  return (
    <div className="banner-home">
      <img src={bannerUrl} alt="Banner inicio" />
    </div>
  );
};
