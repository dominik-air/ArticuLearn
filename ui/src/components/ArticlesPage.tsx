import React, { useEffect, useState } from "react";
import axios from "axios";
import Article from "./Article";

interface Tag {
  value: string;
  id: number;
  article_id: number;
}

interface ArticleContent {
  text?: string;
  image_url?: string;
  id: number;
  article_id: number;
  table_id?: number;
}

interface ArticleData {
  title: string;
  id: number;
  tags: Tag[];
  contents: ArticleContent[];
}

const ArticlesPage: React.FC = () => {
  const API_URL = "http://localhost:8000/api/v1/articles/";
  const [articles, setArticles] = useState<ArticleData[]>([]);

  const fetchArticles = () => {
    axios
      .get<ArticleData[]>(API_URL)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error("Error while fetching articles:", error);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const mapContentsToContentType = (contents: ArticleContent[]) => {
    return contents.map(content => ({
      type: content.image_url ? "image" : content.table_id ? "table" : "text",
      text: content.text,
      imageURL: content.image_url,
      table: undefined,
    }));
  };

  return (
    <div>
      {articles.map(article => (
        <Article
          key={article.id}
          title={article.title}
          content={mapContentsToContentType(article.contents)}
          tags={article.tags.map(tag => tag.value)}
        />
      ))}
    </div>
  );
};

export default ArticlesPage;
