import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import useFetch from 'use-http';
import { FiPlus, FiSend, FiTrash2 } from 'react-icons/fi';
import { filterUsersBySearch, sortUsers } from '../util/user';
import CustomTable from '../components/CustomTable';
import { APIResponse, MessageCategory, NotificationChannel, ResourceType, User, UserAPI } from '../components/Form/types';
import { api } from '../api';
import Form from '../components/Form';
import MessageComposer from '../components/MessageComposer';

const Users: FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isComposerOpen,
    onOpen: onComposerOpen,
    onClose: onComposerClose,
  } = useDisclosure();

  const [rawUsers, setRawUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<{ by: string; direction: 'asc' | 'desc' }>({
    by: '',
    direction: 'asc',
  });

  const columns = [{
    label: 'Name',
    value: 'name',
  }, {
    label: 'Phone Number',
    value: 'phoneNumber',
  }, {
    label: 'Subscriptions',
    value: 'subscribed',
  }, {
    label: 'Channels',
    value: 'channels',
  }];


  const searchHandler = (query: string) => {
    setSearch(query);
  };

  const sortHandler = (head: string, direction: 'asc' | 'desc') => {
    setSort({ by: head, direction });
  };

  const filteredUsers = useMemo(() => {
    const filterd = filterUsersBySearch(rawUsers, search);
    return sortUsers(filterd, sort.by, sort.direction);
  }, [rawUsers, search, sort]);

  const {
    get,
    patch,
    loading,
    response,
    cache,
  } = useFetch(api.users);

  const fetchUsers = async () => {
    try {
      cache.clear();
      const userData: UserAPI[] = await get();
      if (response.ok) {
        const mappedUsers: User[] = userData.map((user) => ({
          ...user,
          subscribed: (user.subscribed?.split(',') || []) as MessageCategory[],
          channels: (user.channels?.split(',') || []) as NotificationChannel[],
        }));

        setRawUsers(mappedUsers);
      }
    } catch {
      toast({
        title: 'Failed to get list of users',
        description: 'Try again',
        status: 'error',
      })
    }
  };

  const unsubscribeCategory = async (userId: number, category: MessageCategory) => {
    try {
      cache.clear();
      const result: APIResponse = await patch(`${userId}/unsubscribe`, { category });
      if (response.ok) {
        toast({
          title: 'Success',
          description: result.message,
          status: 'success',
        })
        await fetchUsers();
      } else {
        throw new Error(result.message);
      }
    } catch (e) {
      toast({
        title: 'Something went wrong',
        description: '',
        status: 'error',
      })
    }
  };

  const leaveChannel = async (userId: number, channel: NotificationChannel) => {
    try {
      cache.clear();
      const result: APIResponse = await patch(`${userId}/leave`, { channel });
      if (response.ok) {
        toast({
          title: 'Success',
          description: result.message,
          status: 'success',
        })
        await fetchUsers();
      } else {
        throw new Error(result.message);
      }
    } catch (e) {
      toast({
        title: 'Something went wrong',
        description: '',
        status: 'error',
      })
    }
  };

  const leaveOrUnsubscribe = (
    userId: number,
    resource: ResourceType,
    resourceName: MessageCategory | NotificationChannel,
  ) => {
    if (resource === ResourceType.CATEGORY) {
      unsubscribeCategory(userId, resourceName as MessageCategory);
    }

    if (resource === ResourceType.CHANNEL) {
      leaveChannel(userId, resourceName as NotificationChannel);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const [selectedUser, setSelectedUser] = useState<number>();
  const [resourceType, setResourceType] = useState<ResourceType>(ResourceType.CATEGORY);

  const handleOpenModal = (userId: number, resType: ResourceType) => {
    setSelectedUser(userId);
    setResourceType(resType);
    onOpen();
  };

  return (
    <>
      <Card minW='container.xl'>
        <CardHeader>
          <HStack justify='space-between'>
            <Text fontSize='2xl'>Users</Text>
            <Button
              size='sm'
              onClick={onComposerOpen}
              colorScheme='teal'
              leftIcon={<FiSend />}
            >
              New message
            </Button>
          </HStack>
        </CardHeader>
        <CustomTable
          loading={loading}
          searchable
          searchPlaceholder='Search user...'
          columns={columns}
          onSearch={searchHandler}
          sortable
          onSort={sortHandler}
        >
          {!filteredUsers.length && (
            <Tr>
              <Td fontSize='sm' fontWeight='medium' color='gray.500' colSpan={columns.length} textAlign='center'>
                {loading && 'Loading...'}
                {!loading && 'No data found.'}
              </Td>
            </Tr>
          )}
          {filteredUsers.map((user: User, index: number) => (
            <Tr key={index}>
              <Td>
                <HStack gap={4}>
                  <Avatar
                    size='sm'
                    name={user.name}
                  />

                  <VStack align='start' gap={0}>
                    <Text fontSize='sm' fontWeight='semibold'>{user.name}</Text>
                    <Text fontSize='xs' color='gray.500'>{user.email}</Text>
                  </VStack>
                </HStack>
              </Td>
              <Td>
                <VStack align='start' gap={0}>
                  <Text fontSize='xs' color='gray.500'>
                    {user.phoneNumber || 'No phone number'}
                  </Text>
                </VStack>
              </Td>
              <Td>
                {user.subscribed.map((subscription) => (
                  <Badge
                    variant='solid'
                    minW={84}
                    textAlign='center'
                    colorScheme='teal'
                    m={1}
                    px={2}
                    py={1}
                  >
                    <HStack>
                      <Text>{subscription}</Text>
                      <IconButton
                        size='xs'
                        icon={<FiTrash2 />}
                        colorScheme='teal'
                        aria-label='unsuscribe'
                        onClick={() => leaveOrUnsubscribe(user.id, ResourceType.CATEGORY, subscription)}
                      />
                    </HStack>
                  </Badge>
                ))}
                <IconButton
                  size='sm'
                  icon={<FiPlus />}
                  colorScheme='teal'
                  aria-label='subscribe'
                  onClick={() => handleOpenModal(user.id, ResourceType.CATEGORY)}
                />
              </Td>
              <Td>
                {user.channels.map((channel) => (
                  <Badge
                    variant='solid'
                    minW={84}
                    textAlign='center'
                    colorScheme='purple'
                    m={1}
                    px={2}
                    py={1}
                  >
                    <HStack>
                      <Text>{channel}</Text>
                      <IconButton
                        size='xs'
                        icon={<FiTrash2 />}
                        colorScheme='purple'
                        aria-label='leave'
                        onClick={() => leaveOrUnsubscribe(user.id, ResourceType.CHANNEL, channel)}
                      />
                    </HStack>
                  </Badge>
                ))}
                <IconButton
                  size='sm'
                  icon={<FiPlus />}
                  colorScheme='purple'
                  aria-label='join'
                  onClick={() => handleOpenModal(user.id, ResourceType.CHANNEL)}
                />
              </Td>
            </Tr>
          ))}
        </CustomTable>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {resourceType === ResourceType.CATEGORY && 'Subscribe to category'}
            {resourceType === ResourceType.CHANNEL && 'Join to channel'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form
              userId={selectedUser as number}
              resourceType={resourceType}
              onClose={onClose}
              onSuccess={fetchUsers}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isComposerOpen} onClose={onComposerClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            New Message
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MessageComposer
              onClose={onComposerClose}
              onSuccess={fetchUsers}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Users;
