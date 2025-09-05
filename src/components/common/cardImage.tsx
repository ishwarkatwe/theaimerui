function CardImage({
  image,
  className,
}: {
  image?: string;
  className?: string;
}) {
  return (
    <figure>
      <img
        src={image}
        alt=""
        className={`object-cover  ${className}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/placeholder.jpg";
        }}
      />
    </figure>
  );
}

export default CardImage;
