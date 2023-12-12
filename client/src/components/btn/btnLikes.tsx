import { useLikes } from "../../hooks/useBlog";

const BtnLikes = ({ id, likes }: { id: string; likes: any }) => {
  const { mutate: likeMutation, isPending: penLike } = useLikes();

  return <button onClick={() => likeMutation(id)}>likes {likes}</button>;
};

export default BtnLikes;
