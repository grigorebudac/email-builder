import styled from '@emotion/styled';

export const ButtonWrapper = styled.button<{ activeColor: string }>`
  cursor: pointer;
  width: auto;
  max-width: 25px;
  height: 25px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  margin-right: 5px;
  transition: all 0.3s ease-in-out;
  padding: 0;

  path {
    stroke: #c6c6c6;
    transition: all 0.3s ease-in-out;
  }

  p {
    display: none;
    color: #fff;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    max-width: 130px;
    padding: 0 5px 0 0;
    border: 1px solid ${(props) => props.activeColor};

    path {
      stroke: ${(props) => props.activeColor};
      transition: all 0.3s ease-in-out;
    }

    p {
      display: block;
      color: ${(props) => props.activeColor};
      transition: all 0.3s ease-in-out;
    }
  }
`;
