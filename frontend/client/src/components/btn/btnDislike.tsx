import React from "react";
import { useDisLikes } from "../../hooks/useBlog";

const BtnDislike = ({ id, dislikes }: { id: string; dislikes: number }) => {
  const { mutate: dislikeMutation, isPending: penDisLike } = useDisLikes();

  return (
    <button onClick={() => dislikeMutation(id)}>dislikes {dislikes}</button>
  );
};

export default BtnDislike;
