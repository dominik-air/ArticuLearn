import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface BadgeProps {
  userName: string;
  achievement: string;
  imageUrl?: string;
}

const Badge: React.FC<BadgeProps> = ({ userName, achievement, imageUrl }) => {
    return (
      <Card sx={{ maxWidth: 345, textAlign: 'center', margin: '20px auto' }}>
        {imageUrl && <CardMedia component="img" height="140" image={imageUrl} alt="Achievement" />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Congratulations, {userName}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You've achieved: {achievement}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<StarIcon />}>Share your achievement</Button>
        </CardActions>
      </Card>
    );
  };
  
  export default Badge;
  