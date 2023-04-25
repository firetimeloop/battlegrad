import styled from 'styled-components';

export const SelectModeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const ControlBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ControlList = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  width: 300px;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 500;
  gap: 20px;

  li + li {
    margin-top: 10px;
  }
`;

export const ControlListIrem = styled.li`
  display: flex;
  justify-content: space-between;
`;
