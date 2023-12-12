import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategory";
import DelCategory from "../Btn/DelCategory";

const ListCategory = () => {
  const { data, isPending, error } = useCategories();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data?.map((category) => (
        <div key={category._id} className='grid grid-cols-2 w-[400px]'>
          <div>{category.title}</div>
          <div className='flex gap-10'>
            <Link to={`/category-list/${category._id}`}>edit</Link>
            <DelCategory id={category._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCategory;
