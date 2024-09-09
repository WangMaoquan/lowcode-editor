/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, PropsWithChildren } from 'react';

export interface CommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  [key: string]: any;
  styles?: CSSProperties;
}
