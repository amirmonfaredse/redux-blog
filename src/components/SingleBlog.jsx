import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteApiBlog, selectBlogById } from "../reducers/blogSlice";
import ShowAuthor from "./ShowAuthor";
import ShowTime from "./ShowTime";
import ReactionButtons from "./ReactionButtons";
const SingleBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blog = useSelector((state) => selectBlogById(state, blogId));
  const handleDelete = () => {
    if (blog) {
      dispatch(deleteApiBlog(blog.id));
      navigate("/");
    }
  };

  if (!blog) {
    return (
      <section>
        <h2>پستی که دنبالش میگردی وجود نداره</h2>
      </section>
    );
  }
  return (
    <section>
      <article className="blog">
        <h2>{blog.title}</h2>
        <div>
          <ShowAuthor userId={blog.user} />
          <ShowTime timestamp={blog.date} />
        </div>
        <p className="blog-content">{blog.content}</p>
        <Link to={`/edit-blog/${blog.id}`} className="button">
          ویرایش پست
        </Link>
        <ReactionButtons blog={blog} />
        <button
          className="muted-button"
          style={{ marginRight: 15 }}
          onClick={handleDelete}
        >
          حذف پست
        </button>
      </article>
    </section>
  );
};
export default SingleBlog;
