import styled from 'styled-components';
// import overlayIllustration from 'assets/illustrations/overlay.svg';

export const Wrapper = styled.div`
  // padding-bottom: 4rem;
  // background-image: url(${overlayIllustration});
  background-size: contain;
  background-position: right top;
  background-repeat: no-repeat;
border-top-right-radius:0;
border-top-left-radius:0;
border-bottom-right-radius:0;
border-bottom-left-radius:100%;
background: #EEEEFF;
`;

export const IntroWrapper = styled.div`
  padding: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Details = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    width: 100%;
    margin-bottom: 2rem;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 36pt;
    color: ${({ theme }) => (theme === 'light' ? '#212121' : '#fff')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 30pt;
    }
  }

  h4 {
    margin-bottom: 2.5rem;
    font-size: 32pt;
    font-weight: normal;
    color: ${({ theme }) => (theme === 'light' ? '#707070' : '#e6e6e6')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 26pt;
    }
  }
`;


export const Thumbnail = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

export const ThumbnailBig = styled.div`
  flex: 2;

  @media (max-width: 960px) {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

export const LinkJoin = styled.div` 
  margin-top: 50px;
  margin: 0.5em 1.5em;
 a {
   color:#3F3D56;
 }
 a:hover {
   color: #3F3D56;
   text-decoration: inherit;
   vertical-align: inherit;
 }
`
export const LinkApply = styled.div`
margin-top: 50px;
margin: 0.5em 1.5em;
a {
  color: white;
}
a:hover {
 color: #3F3D56;
 text-decoration: inherit;
 vertical-align: inherit;
}
`
export const ButtonWrapper = styled.div`
  display: flex;
  margin: 0.7em 1.5em;

`