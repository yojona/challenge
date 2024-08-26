import React, { FC } from 'react';
import { Stack, Progress } from '@chakra-ui/react';

interface LoadingProps {
  isLoading: boolean;
  dense?: boolean;
}

const Loading: FC<LoadingProps> = ({
  isLoading,
  dense = false,
}) => {
  if (!isLoading) return null;

  return (
    <Stack p={dense ? 0 : 3} py={3}>
      <Progress isIndeterminate />
    </Stack>
  )
};

export default Loading;
