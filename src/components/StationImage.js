import React from 'react';
import useImage from '@/data/image';
import styles from '@/styles/Home.module.css';

export default function StationImage(props) {
  const { image, isLoading, isError } = useImage(props.station);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!image) return <img className={styles.foto} src="/camera.png" width="110" height="110" alt="Camera" />;

  return (
    <img className={styles.foto} src={image} width="110" height="110" alt={props.station.name} />
  );
}
