import React from "react";
import {
  Grid,
  Typography,
  Stack,
  Chip,
  Container,
  Paper,
  Divider,
} from "@mui/material";

interface ArticleProps {
  topic: string;
  content: string;
  tags: string[];
}

const Article: React.FC<ArticleProps> = ({ topic, content, tags }) => {
  return (
    <Container
      component={Paper}
      sx={{
        padding: 4,
        gap: 4,
        maxWidth: "md",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h1">{topic}</Typography>
        <Divider />
        <Typography variant="body1">{content}</Typography>
        <Divider />
        <Stack direction={"row"} spacing={2}>
          {tags.map((tag) => (
            <Chip label={tag}></Chip>
          ))}
        </Stack>
      </Grid>
    </Container>
  );
};

export default Article;
