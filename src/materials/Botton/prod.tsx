import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button';
import { CommonComponentProps } from '../../../types';

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

const Button = ({
  type,
  text,
  styles,
  ...props
}: ButtonProps & CommonComponentProps) => {
  return (
    <AntdButton type={type} style={styles} {...props} id={props.id + ''}>
      {text}
    </AntdButton>
  );
};

export default Button;
