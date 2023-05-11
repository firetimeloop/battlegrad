import styled from 'styled-components';

export const ControlBlockWrapper = styled.div`
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

export const ControlListItem = styled.li`
  display: flex;
  justify-content: space-between;

  img.down-arrow {
    rotate: -180deg;
  }

  img.left-arrow {
    rotate: -90deg;
  }

  img.right-arrow {
    rotate: 90deg;
  }
`;
