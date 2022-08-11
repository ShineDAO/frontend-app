import styled from "styled-components";

export const TableD = styled.td`
  text-align: center;
  horizontal-align: center;
  border: none;
  padding-bottom: 0px;
  padding-top: 0px;
  visibility: ${({ visibility }) => visibility || "visible"};
`;

export const TableR = styled.tr`
  border: none;
`;

export const TableLabel = styled.div`
  border-radius: 5px;
  background: ${({ selected }) => (selected ? "green" : "black")};
`;
