import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategory";
import DelCategory from "../Btn/DelCategory";
import { useBlogCategories } from "../../hooks/useBlogCategory";
import DelBlogCategory from "../Btn/DelBlogCategory";

const ListBlogCategory = () => {
  const { data, isPending, error } = useBlogCategories();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data?.map((BlogCategory) => (
        <div key={BlogCategory._id} className='grid grid-cols-2 w-[400px]'>
          <div>{BlogCategory.title}</div>
          <div className='flex gap-10'>
            <Link to={`/blog-category-list/${BlogCategory._id}`}>edit</Link>
            <DelBlogCategory id={BlogCategory._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBlogCategory;
