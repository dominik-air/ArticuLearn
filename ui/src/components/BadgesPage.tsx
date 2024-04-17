import React from "react";
import Badge from "./Badge";

const badgeData = [
  {
    userName: "User1",
    achievement: "Completed Section 1",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdeivnU9NUKKk19u8zgwhSHe0HPGUOIh2dAkuVoqqTw&s",
  },
  {
    userName: "User1",
    achievement: "Completed Section 2",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdeivnU9NUKKk19u8zgwhSHe0HPGUOIh2dAkuVoqqTw&s",
  },
  {
    userName: "User1",
    achievement: "Completed Section 3",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdeivnU9NUKKk19u8zgwhSHe0HPGUOIh2dAkuVoqqTw&s",
  },
];

const BadgesPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {badgeData.map((badge, index) => (
        <Badge
          key={index}
          userName={badge.userName}
          achievement={badge.achievement}
          imageUrl={badge.imageUrl}
        />
      ))}
    </div>
  );
};

export default BadgesPage;
