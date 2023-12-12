import { Link } from "react-router-dom";
import { useBlogs } from "../../hooks/useBlog";
import BtnDislike from "../btn/btnDislike";
import BtnLikes from "../btn/btnLikes";

const ListBlogs = () => {
  const { data: blogs, isPending, error } = useBlogs();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className='grid grid-cols-3 gap-10'>
      {blogs?.map((item: any) => (
        <div key={item._id} className=''>
          <div>{item.title}</div>
          <div>{item.discription}</div>
          <div>{item.category}</div>
          <div className='w-[200px] h-[200px] border border-1 border-slate-700 flex items-center justify-center'>
            {item.images?.map((image: any) => (
              <div key={image._id}>
                <img src={image.url} alt='blog' />
              </div>
            ))}
          </div>
          <div>
            <Link to={`/blog/${item._id}`}>read more</Link>
          </div>
          <div className='flex gap-4'>
            <div>views {item.numViews}</div>
            <BtnLikes id={item._id} likes={item?.likes?.length} />
            <BtnDislike id={item.id} dislikes={item?.dislikes?.length} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBlogs;
