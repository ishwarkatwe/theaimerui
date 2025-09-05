import { AlarmClock, Heart, MessageCircle, User } from "lucide-react";
import { Label } from "../ui/label";

function CardActions({
  author,
  date,
  comments,
  likes,
}: {
  author: string;
  date: string;
  comments: number;
  likes: number;
}) {
  return (
    <div className="flex flex-row justify-between items-center gap-2 mt-4 text-muted-foreground ">
      <Label className="text-xs flex items-center gap-2">
        <User /> {author}
      </Label>

      <Label className="text-xs flex items-center gap-2">
        <Heart /> {likes || 0}
      </Label>

      <Label className="text-xs flex items-center gap-2">
        <MessageCircle /> {comments || 0}
      </Label>

      <Label className="text-xs flex items-center gap-2">
        <AlarmClock /> {date}
      </Label>
    </div>
  );
}

export default CardActions;
