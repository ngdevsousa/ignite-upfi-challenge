import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageURL, setImageURL] = useState('');
  const selecImageURL = (url: string): void => {
    onOpen();
    setImageURL(url);
  };

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(c => (
          <Card data={c} key={c.id} viewImage={selecImageURL} />
        ))}
      </SimpleGrid>

      {isOpen && (
        <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageURL} />
      )}
    </>
  );
}
