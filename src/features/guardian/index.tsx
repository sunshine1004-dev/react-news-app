import Search from '@/components/search';
import NewsList from '@/components/news-list';
import { RootState } from '@/redux'
import { NewsState, setGuardianQuery, initialState } from '@/redux/news-slice'
import { useSelector } from 'react-redux'
import withGuardianApi from '@/components/Hoc/withGuardianApi';
import { useSearchParams } from 'react-router-dom'
import { GuardianQuery } from '@/type'

const NewsApi = () => {
  const { total } = useSelector<RootState, NewsState>((state) => state.news)
  const [searchParams, setSearchParams] = useSearchParams()

  const queryObj: GuardianQuery = Object.fromEntries(searchParams.entries());
  const page = queryObj.page;
  const pageSize = queryObj['page-size'];
  const query = queryObj.q;

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
      newSearchParams.set('page-size', String(pageSize));
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

  const setFilter = (query: GuardianQuery) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);

      Object.entries(query).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, String(value));
        }
      })
      return newSearchParams.toString();
    });
  }

  const setDefault = () => {
    setGuardianQuery(initialState.newsApiQuery);
    const query = Object.fromEntries(Object.entries(initialState.newsApiQuery).map(([key, value]) => [key, String(value)]));
    setSearchParams(query);
  }

  return (
    <>
      <Search
        total={total}
        pageSize={Number(pageSize)}
        setPageSize={setPageSize}
        query={query || ''}
        queryObj={queryObj}
        setQuery={setQuery}
        setFilter={setFilter}
        setDefault={setDefault}
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

export default withGuardianApi(NewsApi);