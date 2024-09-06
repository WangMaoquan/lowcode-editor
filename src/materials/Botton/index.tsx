import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button';
import { CommonComponentProps } from '../../../types';

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

const Button = ({ type, text, id }: ButtonProps & CommonComponentProps) => {
  return (
    <AntdButton data-component-id={id} type={type}>
      {text}
    </AntdButton>
  );
};

export default Button;
