import {
  Badge,
  Card,
  CardHeader,
  HStack,
  IconButton,
  Td,
  Text,
  Tr,
  useToast,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import useFetch from 'use-http';
import CustomTable from '../components/CustomTable';
import { api } from '../api';
import { Log } from '../components/Form/types';
import { formatDatetime } from '../util/string';
import { FiRefreshCcw } from 'react-icons/fi';

const Logger: FC = () => {
  const toast = useToast();
  const columns = [{
    label: 'Message',
    value: 'message',
  }, {
    label: 'Created at',
    value: 'createdAt',
  }, {
    label: 'Log category',
    value: 'category',
  }];

  const {
    get,
    loading,
    response,
    cache,
    error,
  } = useFetch<Log[]>(api.logs);
  const [logs, setLogs] = useState<Log[]>([]);

  const fetchLogs = async () => {
    try {
      cache.clear();
      const data = await get();
      if (response.ok || error) {
        setLogs(data);
      }
    } catch {
      toast({
        title: 'Failed to get list of logs',
        description: 'Try again',
        status: 'error',
      })
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Card minW='container.xl'>
      <CardHeader>
        <HStack justify='space-between'>
          <Text fontSize='2xl'>Logs</Text>
          <IconButton
            size='sm'
            icon={<FiRefreshCcw />}
            colorScheme='teal'
            aria-label='refresh'
            onClick={() => fetchLogs()}
          />
        </HStack>
      </CardHeader>
      <CustomTable
        loading={loading}
        searchPlaceholder='Search user...'
        columns={columns}
      >
        {!logs?.length && (
          <Tr>
            <Td fontSize='sm' fontWeight='medium' color='gray.500' colSpan={columns.length} textAlign='center'>
              {loading && 'Loading...'}
              {!loading && 'No data found.'}
            </Td>
          </Tr>
        )}
        {logs?.map((log: Log, index: number) => (
          <Tr key={index}>
            <Td>
              <Text fontSize='sm' fontWeight='semibold'>{log.message}</Text>
            </Td>
            <Td>
              <Text fontSize='sm' fontWeight='semibold'>{formatDatetime(log.createdAt)}</Text>
            </Td>
            <Td>
              <Badge
                variant='solid'
                minW={84}
                textAlign='center'
                colorScheme='teal'
                m={1}
                px={2}
                py={1}
              >
                <Text>{log.category}</Text>
              </Badge>
            </Td>
          </Tr>
        ))}
      </CustomTable>
    </Card>
  );
};

export default Logger;
