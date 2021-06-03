import { useToast } from '@chakra-ui/react';
import { DEFAULT_DURATION } from './constants';
import {
  UPLOAD_ERROR_DESCRIPTION,
  UPLOAD_ERROR_TITLE,
  UPLOAD_INFO_DESCRIPTION,
  UPLOAD_INFO_TITLE,
  UPLOAD_SUCCESS_DESCRIPTION,
  UPLOAD_SUCCESS_TITLE,
} from './strings';

interface UseCustomToastResponse {
  ImageUploadSuccess: () => void;
  ImageUploadInfo: () => void;
  ImageUploadError: () => void;
}

export function useCustomToast(): UseCustomToastResponse {
  const toast = useToast();
  const ImageUploadSuccess = (): void => {
    toast({
      title: UPLOAD_SUCCESS_TITLE,
      description: UPLOAD_SUCCESS_DESCRIPTION,
      status: 'success',
      duration: DEFAULT_DURATION,
    });
  };

  const ImageUploadInfo = (): void => {
    toast({
      title: UPLOAD_INFO_TITLE,
      description: UPLOAD_INFO_DESCRIPTION,
      status: 'info',
      duration: DEFAULT_DURATION,
    });
  };

  const ImageUploadError = (): void => {
    toast({
      title: UPLOAD_ERROR_TITLE,
      description: UPLOAD_ERROR_DESCRIPTION,
      status: 'error',
      duration: DEFAULT_DURATION,
    });
  };

  return {
    ImageUploadSuccess,
    ImageUploadInfo,
    ImageUploadError,
  };
}
