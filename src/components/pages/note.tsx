import { useParams } from "react-router-dom";
import useStore from "../utils/states/notes";
import type { Item } from "../utils/interface/Items";
import { useEffect, useState } from "react";
import CardImage from "../common/cardImage";
import CardActions from "../common/cardActions";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function Note() {
  const noteId = useParams().noteId;
  const notes: Item[] = useStore((state: any) => state.notes);
  const note = (notes || []).find((n) => n._id === noteId) as Item;
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<
    {
      id: number;
      comment: string;
      date: string;
    }[]
  >([]);

  useEffect(() => {
    if (!notes) return;
  }, [notes]);

  const addComment = () => {
    if (!comment.trim()) return;
    setCommentList((prev) => [
      ...prev,
      { id: Date.now(), comment, date: new Date().toISOString() },
    ]);
    setComment("");
  };

  if (!note) return <>No found</>;

  const { name, description, likedBy, createdAt, images } = note;

  return (
    <>
      {images.length > 0 && (
        <CardImage image={images[0]} className="w-full h-[350px] object-fill" />
      )}
      <h1 className="text-3xl font-bold my-6">{name}</h1>
      {/* <p className="my-4 text-lg text-muted-foreground">{description}</p> */}
      <hr className="my-4" />
      <CardActions
        author={"Ishwar"}
        date={new Date(createdAt).toDateString()}
        comments={0}
        likes={likedBy.length || 0}
      />
      <hr className="my-4" />

      <div
        className="leading-8 text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">
          Comments ({commentList.length})
        </h2>
        {commentList.length == 0 && (
          <p className="text-gray-600 my-2">
            No comments yet. Be the first to comment!
          </p>
        )}

        {commentList.map((c) => (
          <div key={c.id} className="mb-4 p-4 border rounded-lg">
            <p className="text-gray-800">{c.comment}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(c.date).toLocaleString()}
            </p>
          </div>
        ))}

        <div className="text-right">
          <Textarea
            className="mt-4 w-full h-32"
            placeholder="Add a comment..."
            aria-label="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="mt-2"
            disabled={!comment.trim()}
            onClick={addComment}
          >
            Submit
          </Button>
        </div>
      </section>
    </>
  );
}

export default Note;
