import React from "react";
import Listblog from "../../components/layout/Listblog";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div>
      <div>
        <h1>Blogs list</h1>
        <Link to='/blog' className='underline'>
          new Blog
        </Link>
      </div>
      <div>
        <Listblog />
      </div>
    </div>
  );
};

export default Blogs;
