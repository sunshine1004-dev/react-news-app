export type User = {
  id: number;
  name: string;
  email: string;
  exp: number;
};

export type NewsApiArticle = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type NewsApiQuery = {
  q?: string;
  sources?: string;
  from?: string;
  to?: string;
  language?: string;
  category?: string;
  author?: string;
  sort_by?: "relevancy" | "popularity" | "publishedAt";
  page_size?: number;
  page?: number;
};

export type NewsApiCallMethod = 'everything' | 'topHeadlines';

export type GuardianQuery = {
  q?: string;
  section?: string;
  reference?: string;
  "reference-type"?: string;
  tag?: string;
  lang?: string;
  "from-date"?: string;
  "to-date"?: string;
  "use-date"?: string;
  page?: number;
  "page-size"?: number;
  "order-by"?: "newest" | "oldest" | "relevance ";
  "show-tags"?: string;
  "show-section"?: string;
};
