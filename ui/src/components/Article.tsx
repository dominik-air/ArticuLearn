import React from "react";
import {
  Grid,
  Typography,
  Stack,
  Chip,
  Container,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";

interface TableData {
  headers: string[];
  data: (string | number)[][];
}

interface Content {
  type: "text" | "image" | "table";
  text?: string;
  imageURL?: string;
  table?: TableData;
}

interface ArticleProps {
  title: string;
  content: Content[];
  tags: string[];
}

const Article: React.FC<ArticleProps> = ({ title, content, tags }) => {
  const renderContent = (contentItem: Content, index: number) => {
    switch (contentItem.type) {
      case "text":
        return (
          <Typography key={index} variant="body1">
            {contentItem.text}
          </Typography>
        );
      case "image":
        return contentItem.imageURL ? (
          <img
            key={index}
            src={contentItem.imageURL}
            alt=""
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              padding: 4,
            }}
          />
        ) : null;
      case "table":
        return contentItem.table ? (
          <TableContainer component={Paper} sx={{ padding: 2, gap: 2 }}>
            <Table key={index}>
              <TableHead>
                <TableRow>
                  {contentItem.table.headers.map((header, idx) => (
                    <TableCell key={idx}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {contentItem.table.data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Container
      component={Paper}
      sx={{
        padding: 4,
        gap: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h3">{title}</Typography>
        <Divider sx={{ width: "100%", my: "2vh" }} />
        {content.map(renderContent)}
        <Divider sx={{ width: "100%", my: "2vh" }} />
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
