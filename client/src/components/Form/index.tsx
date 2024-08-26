import React, { FC, useEffect, useState } from 'react';
import { APIResponse, MessageCategory, NotificationChannel, ResourceType } from './types';
import { Button, HStack, Select, Text, useToast, VStack } from '@chakra-ui/react';
import { useFetch } from 'use-http';
import { api } from '../../api';

interface FormProps {
  userId: number;
  resourceType: ResourceType
  onClose: () => void;
  onSuccess: () => void;
}

const Form: FC<FormProps> = ({
  userId,
  resourceType,
  onClose,
  onSuccess,
}) => {
  const toast = useToast();
  const [resource, setResource] = useState<MessageCategory | NotificationChannel>(MessageCategory.FINANCE);

  const handleResourceSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selection = e.target.value as MessageCategory | NotificationChannel;
    setResource(selection);
  };

  const {
    patch,
    loading,
    response,
  } = useFetch(`${api.users}/${userId}`);

  const subscribeToCategory = async () => {
    try {
      const result: APIResponse = await patch('subscribe', {
        category: resource,
      });
      if (response.ok) {
        toast({
          title: 'Success',
          description: result.message,
          status: 'success',
        });

        await onSuccess();
        onClose();
      }
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Try again',
        status: 'error',
      });
    }
  };

  const joinChannel = async () => {
    try {
      const result: APIResponse = await patch('join', {
        channel: resource,
      });
      if (response.ok) {
        toast({
          title: 'Success',
          description: result.message,
          status: 'success',
        });

        await onSuccess();
        onClose();
      }
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Try again',
        status: 'error',
      });
    }
  };

  const handleUpdate = () => {
    if (resourceType === ResourceType.CATEGORY) {
      subscribeToCategory();
    }

    if (resourceType === ResourceType.CHANNEL) {
      joinChannel();
    }
  };

  useEffect(() => {
    if (resourceType === ResourceType.CATEGORY) {
      setResource(MessageCategory.FINANCE)
    } else {
      setResource(NotificationChannel.SMS);
    }
  }, [resourceType]);

  return (
    <VStack>
      <HStack width='100%'>
        <Text>Select: </Text>
        <Select
          onChange={handleResourceSelection}
          value={resource}
        >
          {resourceType === ResourceType.CATEGORY && (
            Object.entries(MessageCategory).map(([categoryName, categoryValue]) => (
              <option value={categoryValue}>{categoryName}</option>
            ))
          )}

          {resourceType === ResourceType.CHANNEL && (
            Object.entries(NotificationChannel).map(([channelName, channelValue]) => (
              <option value={channelValue}>{channelName}</option>
            ))
          )}
        </Select>
      </HStack>
      <HStack width='100%' justifyContent='end'>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          isLoading={loading}
          colorScheme='teal'
        >
          {resourceType === ResourceType.CATEGORY && 'Subscribe'}
          {resourceType === ResourceType.CHANNEL && 'Join'}
        </Button>
      </HStack>
    </VStack>
  )
};

export default Form;