export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type HistoryProps = {
  navigate: any;
  location: any;
}

export const history: HistoryProps = {
  navigate: null,
  location: null,
}