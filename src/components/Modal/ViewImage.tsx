import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Center,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="gray.800" w="auto" maxW={900}>
          <ModalBody padding="0px" overflow="auto">
            <Image maxH={600} objectFit="cover" src={imgUrl} />
          </ModalBody>
          <ModalFooter h="32px" justifyContent="flex-start">
            <Link href={imgUrl}>Abrir original</Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
