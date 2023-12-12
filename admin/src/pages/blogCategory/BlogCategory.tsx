import { Link } from "react-router-dom";
import BlogCategoryForm from "../../components/Form/BlogCategoryForm";

const BlogCategory = () => {
  return (
    <section>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>
          Form create blog category
        </h1>
        <Link to='/blog-category-list' className='underline'>
          go to blog category list
        </Link>
      </div>
      <div>
        <BlogCategoryForm />
      </div>
    </section>
  );
};

export default BlogCategory;
