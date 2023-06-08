import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { getNewsApiArticles, setNewsApiQuery } from '@/redux/news-slice';
import { useDispatch } from 'react-redux'
import { NewsApiQuery } from '@/type'

type Props = {
  [key: string]: any
}

export default <P extends object>(Component: React.ComponentType<P>) => {
  return (props: Props) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
      const query: NewsApiQuery = Object.fromEntries(searchParams.entries());
      dispatch(setNewsApiQuery(query));
      
      if (query.category || query.country) {
        dispatch(getNewsApiArticles({ query, method: 'topHeadlines' }));
      } else {
        dispatch(getNewsApiArticles({ query, method: 'everything' }));
      }
    }, [searchParams]);

    return (
      <Component {...props as P} />
    )
  }
}