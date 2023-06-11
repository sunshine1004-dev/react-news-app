export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type HistoryProps = {
  navigate: any;
  location: any;
  search: {
    searchParams: any;
    setSearchParams: any;
  };  
}

export const history: HistoryProps = {
  navigate: null,
  location: null,
  search: {
    searchParams: null,
    setSearchParams: null,
  }
}