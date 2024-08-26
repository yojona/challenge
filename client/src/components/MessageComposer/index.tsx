import React, { FC, useState } from 'react';
import { Button, HStack, Select, Text, Textarea, useToast, VStack } from '@chakra-ui/react';
import { useFetch } from 'use-http';
import { api } from '../../api';
import { APIResponse, MessageCategory } from '../Form/types';

interface MessageComposerProps {
  onClose: () => void;
  onSuccess: () => void;
}

const MessageComposer: FC<MessageComposerProps> = ({
  onClose,
  onSuccess,
}) => {
  const toast = useToast();

  const [category, setCategory] = useState<MessageCategory>(MessageCategory.FINANCE);
  const [messageContent, setMessageContent] = useState('');

  const handleCategorySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selection = e.target.value as MessageCategory;
    setCategory(selection);
  };

  const handleMessageUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setMessageContent(content);
  };

  const {
    post,
    loading,
    response,
  } = useFetch(`${api.messages}`);

  const postMessage = async () => {
    try {
      const result: APIResponse = await post('compose', {
        category,
        content: messageContent,
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

  return (
    <VStack>
      <VStack width='100%'>
        <HStack width='100%'>
          <Text>Category: </Text>
          <Select
            onChange={handleCategorySelection}
            value={category}
          >
            {Object.entries(MessageCategory).map(([categoryName, categoryValue]) => (
              <option value={categoryValue}>{categoryName}</option>
            ))}
          </Select>
        </HStack>
        <Textarea
          value={messageContent}
          onChange={handleMessageUpdate}
        />
      </VStack>
      <HStack width='100%' justifyContent='end'>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={postMessage}
          isLoading={loading}
          colorScheme='teal'
          disabled={!messageContent.length}
        >
          Send
        </Button>
      </HStack>
    </VStack>
  )
};

export default MessageComposer;
