import React from 'react';
import Style from './styles';

export const Avatar = ({ imageUrl, alt, width, height }) => (
  <Style.Wrapper width={width} height={height}>
    <Style.Image src={imageUrl} alt={alt} />
  </Style.Wrapper>
);
