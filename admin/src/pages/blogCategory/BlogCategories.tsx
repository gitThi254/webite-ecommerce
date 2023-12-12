import { Link } from "react-router-dom";
import ListBlogCategory from "../../components/layout/ListBlogCategory";

const BlogCategories = () => {
  return (
    <div>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>List Categories</h1>
        <Link to='/blog-category' className='underline'>
          New Blog category
        </Link>
      </div>
      <div>
        <ListBlogCategory />
      </div>
    </div>
  );
};

export default BlogCategories;
