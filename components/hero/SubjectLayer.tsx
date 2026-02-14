import React from 'react';
import Image from 'next/image';
import { SubjectLayerProps } from './types';

export const SubjectLayer = React.memo<SubjectLayerProps>(({
  src,
  alt,
  width,
  height,
  priority = true,
  scale = 2.2,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={100}
      style={{
        width: 'auto',
        height: '100%',
        objectFit: 'contain',
        transform: `scale(${scale})`,
        imageRendering: 'crisp-edges',
      }}
    />
  );
});

export default SubjectLayer;
