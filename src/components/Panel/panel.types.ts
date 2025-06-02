import { ReactNode } from 'react';

export type PanelProps = {
  title?: string;
  iconBeforeTitle?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
};
