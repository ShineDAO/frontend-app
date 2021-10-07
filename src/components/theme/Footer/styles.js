import styled from "styled-components";

export const Wrapper = styled.div`
  position: ${({ position }) => (position === "absolute" ? "absolute" : "relative")};
  margin-bottom: 50px;
  padding-left: 32px;
  margin-top: 120px;

  bottom: ${({ bottom }) => bottom};
  width:${({ width }) => width};

  @media (max-width: 960px) {
    margin: 0;
  }
`;

// export const QuartCircle = styled.div`
//   background-size: contain;
//   border-radius: 100% 0 0 0;
//   background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
//   transition: 0.3s all;
//   right: 0;
//   height: 400px;
//   width: 400px;
//   position: absolute;
//   bottom: -50px;
//   z-index: -1;

//   @media (max-width: 960px) {
//     height: 200px;
//     width: 200px;
//     left: 0;
//     border-radius: 0 100% 0 0;
//  }
// `;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 1120px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 680px) {
    flex-direction: column;
    display: inline;
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    margin: 0 0.5rem;

    img {
      margin: 0;
    }

    &:first-child,
    &:last-child {
      margin: 0;
    }
  }
`;

export const Details = styled.div`
  h3 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 9px;
  }
  a,
  span {
    font-color: ${({ theme }) => (theme === "light" ? "#1E1E1E" : "#fff")};
    font-size: 14px;
  }

  @media (max-width: 680px) {
    margin-bottom: 24px;
  }
`;
