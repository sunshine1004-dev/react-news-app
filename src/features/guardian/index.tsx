import Search from '@/components/search';
import NewsList from '@/components/news-list';
import { RootState } from '@/redux'
import { NewsState } from '@/redux/news-slice'
import { useSelector } from 'react-redux'
import withNewsApi from '@/components/Hoc/withNewsApi'
import { useSearchParams } from 'react-router-dom'
import { NewsApiQuery } from '@/type'

const NewsApi = () => {
  const { total } = useSelector<RootState, NewsState>((state) => state.news)
  const [searchParams, setSearchParams] = useSearchParams()

  const queryObj: NewsApiQuery = Object.fromEntries(searchParams.entries());
  const page = queryObj.page;
  const pageSize = queryObj.page_size;
  const query = queryObj.q || '';

  const setPage = (page: number) => {

    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set('page', String(page));
      return newSearchParams.toString();
    });
  }

  const setPageSize = (pageSize: number) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set('page_size', String(pageSize));
      return newSearchParams.toString();
    });
  }

  const setQuery = (query: string) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set('q', String(query));
      return newSearchParams.toString();
    });
  }

  const setFilter = (query: NewsApiQuery) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);

      Object.entries(query).forEach(([key, value]) => {
        console.log(key, value);
        if (value) {
          newSearchParams.set(key, String(value));
        }
      })
      return newSearchParams.toString();
    });
  }

  return (
    <>
      <Search
        total={total}
        pageSize={Number(pageSize)}
        setPageSize={setPageSize}
        query={query}
        queryObj={queryObj}
        setQuery={setQuery}
        setFilter={setFilter}
      />
      <NewsList
        page={Number(page)}
        pageSize={Number(pageSize)}
        total={total}
        setPage={setPage}
      />
    </>
  )
}

export default withNewsApi(NewsApi);