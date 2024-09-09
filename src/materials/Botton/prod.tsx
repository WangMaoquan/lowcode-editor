import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button';
import { CommonComponentProps } from '../../../types';

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

const Button = ({ type, text, styles }: ButtonProps & CommonComponentProps) => {
  return (
    <AntdButton type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Button;
