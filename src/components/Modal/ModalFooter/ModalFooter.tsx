import Button from '@/components/Button/Button';
import type { ButtonProps } from '@/components/Button/button.types';

interface ModalFooterProps {
  buttons: (Omit<ButtonProps, 'onClick'> & { onClick: () => void })[];
  fixed?: boolean;
}

export default function ModalFooter({ buttons, fixed = false }: ModalFooterProps) {
  return (
    <div
      className={`flex justify-end space-x-3 p-4 ${
        fixed ? 'sticky bottom-0 bg-light-100 dark:bg-gray-800' : ''
      }`}
    >
      {buttons.map((btn, index) => (
        <Button key={index} {...btn} />
      ))}
    </div>
  );
}
