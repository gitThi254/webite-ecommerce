import { Link } from "react-router-dom";
import ListCategory from "../../components/layout/ListCategory";

const Categories = () => {
  return (
    <div>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>List Categories</h1>
        <Link to='/category' className='underline'>
          New category
        </Link>
      </div>
      <div>
        <ListCategory />
      </div>
    </div>
  );
};

export default Categories;
