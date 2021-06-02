import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface GetImageOptions {
  pageParam?: string;
}

interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  ts: number;
}

interface ImagesResponse {
  data: Array<Image>;
  after: string | null;
}

export default function Home(): JSX.Element {
  const getImages = async ({
    pageParam = '',
  }: GetImageOptions): Promise<ImagesResponse> => {
    const { data } = await api.get<ImagesResponse>(
      `api/images?after=${pageParam}`
    );
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: (prevPage, pages) => prevPage.after,
  });

  const formattedData = useMemo<Array<Image>>(() => {
    return data?.pages.flatMap(page => {
      return page.data;
    });
  }, [data]);

  if (isError) return <Error />;

  return (
    <>
      <Header />

      {isLoading ? (
        <Loading />
      ) : (
        <Box maxW={1120} px={20} mx="auto" my={20}>
          <CardList cards={formattedData} />
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          )}
        </Box>
      )}
    </>
  );
}
