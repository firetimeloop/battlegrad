import styled from 'styled-components';

export const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  border-radius: 50px;

  label {
    position: absolute;
    width: 100%;
    height: 25px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 50px;
    filter: contrast(0.6);
    cursor: pointer;
  }

  input {
    position: absolute;
    display: none;
  }

  .slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: 0.3s;
  }

  input:checked ~ .slider {
    background-color: ${({ theme }) => theme.colors.onBackground};
  }

  .slider::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-shadow: inset 7px -1px 0 0 ${({ theme }) => theme.colors.onBackground};
    background-color: ${({ theme }) => theme.colors.background};
    transition: 0.3s;
  }

  input:checked ~ .slider::before {
    transform: translateX(23px);
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: none;
  }
`;
