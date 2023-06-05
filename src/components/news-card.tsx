import {
  Card,
  CardActionArea,
  CardMedia,
  Link,
  Typography,
  Stack,
  CardContent,
} from "@mui/material";

type News = {
  source: {
    id: object;
    name: string;
  };
  urlToImage: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  content: string;
}

interface Props {
  data: News | any
}

const NewsCard = ({ data }: Props) => {
  return (
    <Card sx={{ width: '100%', minHeight: 430 }} elevation={5}>
      <CardActionArea>
        <CardMedia sx={{ height: 250 }} image={data.urlToImage} />
      </CardActionArea>
      <CardContent sx={{ minHeight: 200, maxHeight: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Link href={data.urlToImage} target="_blank">
          <Typography variant="h6" mb={2} gutterBottom sx={{ width: '100%' }}>
            {data.title}
          </Typography>
        </Link>
        <Typography color="GrayText">
          {data.description}
        </Typography>
        <Stack direction="row" mt={2}>
          <Typography fontWeight={700} sx={{ minWidth: '25%' }} gutterBottom color="GrayText">
            Author:
          </Typography>
          <Typography gutterBottom color="GrayText">
            {data.author}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography fontWeight={700} sx={{ minWidth: '25%' }} color="gray">
            Published:
          </Typography>
          <Typography gutterBottom color="GrayText">
            <i>{data.publishedAt}</i>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NewsCard;