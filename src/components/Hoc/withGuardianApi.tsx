import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { getGuardianApiArticles, setGuardianQuery } from '@/redux/news-slice';
import { useDispatch } from 'react-redux'
import { GuardianQuery } from '@/type'

type Props = {
  [key: string]: any
}

export default <P extends object>(Component: React.ComponentType<P>) => {
  return (props: Props) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
      const query: GuardianQuery = Object.fromEntries(searchParams.entries());
      dispatch(setGuardianQuery(query));
      
      getGuardianApiArticles(query);
    }, [searchParams]);

    return (
      <Component {...props as P} />
    )
  }
}