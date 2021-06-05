import React from 'react';
import Style from './styles';

export const Avatar = ({ imageUrl, alt }) => (
  <Style.Wrapper>
    <Style.Image src={imageUrl} alt={alt} />
  </Style.Wrapper>
);
