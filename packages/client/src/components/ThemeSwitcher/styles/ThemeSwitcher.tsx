import styled from 'styled-components';

export const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 25px;

  label {
    position: absolute;
    width: 100%;
    height: 25px;
    background-color: #2e2c2c;
    border-radius: 50px;
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
    background-color: white;
  }

  .slider::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-shadow: inset 7px -1px 0px 0px white;
    background-color: #2e2c2c;
    transition: 0.3s;
  }

  input:checked ~ .slider::before {
    transform: translateX(23px);
    background-color: #2e2c2c;
    box-shadow: none;
  }
`;
