import { CardHeader, CardDescription, CardTitle, Card } from "../ui/card";
import type { Item } from "../utils/interface/Items";
import { Link } from "react-router-dom";
import CardImage from "./cardImage";
import CardActions from "./cardActions";

function CardView(props: { item: Item; fullContent?: boolean }) {
  const { name, description, images, createdAt, likedBy } = props?.item || {};
  const { fullContent } = props;
  return (
    <>
      {props?.item?._id && (
        <Link to={`/note/${props?.item?._id}`}>
          <Card className="my-6">
            <CardHeader>
              <CardDescription
                className={"flex " + (fullContent ? "flex-col" : "flex-row")}
              >
                <CardImage image={images[0]} className="w-full h-38" />
                <section className="ml-4 p-2 flex flex-col justify-between w-full">
                  <CardTitle className="my-2 text-2xl line-clamp-1 text-black">
                    {name}
                  </CardTitle>
                  <p className="leading-7 text-lg line-clamp-2">{description}</p>

                  <div className="flex flex-col">
                    {fullContent && (
                      <div className="mt-4">
                        <div
                          className="leading-8"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </div>
                    )}
                  </div>
                  <CardActions
                    author={"Ishwar"}
                    date={new Date(createdAt).toDateString()}
                    comments={0}
                    likes={likedBy.length || 0}
                  />
                </section>
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}
    </>
  );
}

export default CardView;
