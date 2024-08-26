import {
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FC, ReactElement, useState } from 'react';
import Loading from '../Misc/Loading';
import Head, { Header } from './Head';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';

export type ToolbarItem = {
  type: 'button' | 'icon-button';
  label: string;
  icon: ReactElement;
  isRound?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

interface CustomTableProps {
  loading: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  columns: Header[];
  sortable?: boolean;
  children: React.ReactNode;
  onSort?: (sortBy: string, sortDirection: 'asc' | 'desc') => void;
  onSearch?: (search: string) => void;
  toolbar?: ToolbarItem[],
  page?: number;
  paginable?: boolean;
  pageOptions?: number[];
  rowsPerPage?: number;
  totalItems?: number;
  onRowsPerPageChange?: (rows: number) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  canPrevPage?: boolean;
  canNextPage?: boolean;
}

const CustomTable: FC<CustomTableProps> = ({
  loading,
  searchable = false,
  searchPlaceholder = '',
  columns,
  sortable = false,
  onSort,
  onSearch,
  children,
  toolbar,
  paginable = false,
  pageOptions,
  page = 1,
  totalItems = 1,
  rowsPerPage = 10,
  onRowsPerPageChange,
  onNextPage,
  onPrevPage,
  canPrevPage = false,
  canNextPage = false,
}) => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortHandler = (head: string, direction: 'asc' | 'desc') => {
    if (!sortable) return;
    setSortBy(head);
    setSortDirection(direction);
    onSort && onSort(head, direction);
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    if (!onSearch) return;
    onSearch(event.target.value);
  };

  const rowsPerPageHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRowsPerPageChange && onRowsPerPageChange(Number(event.target.value));
  };

  const firstRow = (page - 1) * rowsPerPage;

  return (
    <TableContainer>
      <HStack
        justify='end'
        borderBottomWidth={1}
        borderBottomStyle='solid'
        borderBottomColor={useColorModeValue('gray.200', 'gray.600')}
      >
        {searchable && (
          <InputGroup variant='flushed' pt={2}>
            <InputLeftElement pb={2} pt={4}>
              <Icon color='gray' as={FiSearch} />
            </InputLeftElement>
            <Input
              pb={2}
              placeholder={searchPlaceholder}
              value={search}
              onChange={searchHandler}
              border='none'
            />
          </InputGroup>
        )}
      </HStack>
      <Loading isLoading={loading} />
      <Table>
        <Head
          headers={columns}
          sortable={sortable}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onClick={sortHandler}
        />
        <Tbody>
          {children}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
