import { Button, IconButton, Tooltip } from '@chakra-ui/react';
import React, { FC, ReactElement } from 'react';

interface ToolbarButtonProps {
  type: 'button' | 'icon-button';
  label: string;
  icon: ReactElement;
  isRound?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({
  type,
  label,
  icon,
  onClick,
  isRound = false,
  disabled = false,
}) => {
  return (
    <>
      {type === 'button' && (
        <Button
          leftIcon={icon}
          onClick={onClick}
          isDisabled={disabled}
          size='sm'
        >
          {label}
        </Button>
      )}
      {type === 'icon-button' && (
        <Tooltip label={label}>
          <IconButton
            aria-label={label}
            icon={icon}
            isRound={isRound}
            onClick={onClick}
            isDisabled={disabled}
          />
        </Tooltip>
      )}
    </>
  );
};

export default ToolbarButton;
