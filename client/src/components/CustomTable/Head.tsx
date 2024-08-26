import { Button, HStack, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FiChevronDown, FiChevronUp, FiMinus } from 'react-icons/fi';

export type Header = {
  label: string;
  value?: string;
};

interface HeadProps {
  headers: Header[];
  sortable: boolean;
  sortBy: string;
  sortDirection?: 'asc' | 'desc';
  onClick: (sortBy: string, sortDirection: 'asc' | 'desc') => void;
}

interface SortIconProps {
  header: string;
  sortable: boolean;
  sortBy: string;
  sortDirection?: 'asc' | 'desc';
}

const SortIcon: FC<SortIconProps> = ({
  header,
  sortable,
  sortBy,
  sortDirection,
}) => {
  if (sortable && sortBy === header && sortDirection === 'asc') {
    return <FiChevronUp />;
  }

  if (sortable && sortBy === header && sortDirection === 'desc') {
    return <FiChevronDown />;
  }

  return <FiMinus style={{
    opacity: 0,
  }} />;
};

const Head: FC<HeadProps> = ({
  headers,
  sortable,
  sortBy,
  sortDirection,
  onClick,
}) => {

  const sortHandler = (head: Header) => {
    if (sortable && head.value) {
      if (sortBy === head.value && sortDirection === 'asc') {
        onClick(head.value, 'desc');
      } else {
        onClick(head.value, 'asc');
      }
    }
  };

  return (
    <Thead>
      <Tr>
        {headers.map((header, index) => (
          <React.Fragment key={`${header.label}-${index}`}>
            {!header.value && <Th>{header.label}</Th>}
            {header.value && !sortable && <Th>{header.label}</Th>}
            {header.value && sortable && (
              <Th maxW={80}>
                <HStack>
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => sortHandler(header)}
                    rightIcon={<SortIcon
                      header={header.value}
                      sortable={sortable}
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                    />}
                  >
                    <Text
                      fontSize='xs'
                      fontWeight='bold'
                      textTransform='uppercase'
                      color='gray.600'
                    >
                      {header.label}
                    </Text>
                  </Button>
                </HStack>
              </Th >
            )}
          </React.Fragment>
        ))}
      </Tr>
    </Thead >
  );
};

export default Head;
