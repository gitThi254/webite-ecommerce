import { useDelCategory } from "../../hooks/useCategory";
import { useDelColor } from "../../hooks/useColor";

const DelColor = ({ id }: { id?: string }) => {
  const { mutate: deleteColorMutation, isPending } = useDelColor();

  return (
    <button onClick={() => deleteColorMutation(id)} disabled={isPending}>
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default DelColor;
