import React from "react";
import axios from "axios";
import Badge from "./Badge";

const userName = "user";

interface BadgeData {
  achievement: string;
  imageUrl: string;
}

const dummyBadgeData: BadgeData[] = [
  {
    achievement: "Completed Section 1",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdeivnU9NUKKk19u8zgwhSHe0HPGUOIh2dAkuVoqqTw&s",
  },
  {
    achievement: "Completed Section 2",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdeivnU9NUKKk19u8zgwhSHe0HPGUOIh2dAkuVoqqTw&s",
  },
  {
    achievement: "Completed Section 3",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdeivnU9NUKKk19u8zgwhSHe0HPGUOIh2dAkuVoqqTw&s",
  },
];



const BadgesPage: React.FC = () => {

  const API_URL = "http://localhost:8000/api/v1/badges/";
  const [badges, setBadges] = React.useState<BadgeData[]>([]);

  const fetchBadges = () => {
    axios
      .get<BadgeData[]>(API_URL)
      .then((response) => {
        setBadges(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching videos:", error);
        setBadges(dummyBadgeData);
      });
  };

  React.useEffect(() => {
    fetchBadges();
    const interval = setInterval(() => {
      fetchBadges();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {badges.map((badge, index) => (
        <Badge
          key={index}
          userName={userName}
          achievement={badge.achievement}
          imageUrl={badge.imageUrl}
        />
      ))}
    </div>
  );
};

export default BadgesPage;
