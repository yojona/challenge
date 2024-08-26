import { Container, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import Users from './Users';
import Logger from './Logger';

const Layout: FC = () => (
  <Container minW='container.xl' mt={4}>
    <VStack>
      <Users />
      <Logger />
    </VStack>
  </Container>
);

export default Layout;
