import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
import { formValidations } from './validations';
import { useCustomToast } from '../../hooks';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();
  const { ImageUploadSuccess, ImageUploadInfo, ImageUploadError } =
    useCustomToast();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (formData: Record<string, unknown>) => {
      const { data } = await api.post('/api/images', {
        ...formData,
        url: imageUrl,
      });
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('images'),
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const resetAll = (): void => {
    reset();
    setImageUrl('');
    setLocalImageUrl('');
    closeModal();
  };
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    if (!imageUrl) {
      ImageUploadInfo();
      return;
    }

    try {
      mutation.mutateAsync(data);
      ImageUploadSuccess();
    } catch (err) {
      ImageUploadError();
    } finally {
      resetAll();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="image"
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          {...register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
