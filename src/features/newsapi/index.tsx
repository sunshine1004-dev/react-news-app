import Search from '@/components/search';
import NewsList from '@/components/news-list';

const NewsApi = () => {
  return (
    <>
      <Search count={302} />
      <NewsList />
    </>
  )
}

export default NewsApi;