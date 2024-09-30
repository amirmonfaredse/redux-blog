import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import ShowAuthor from "./ShowAuthor";
import ShowTime from "./ShowTime";
import ReactionButtons from "./ReactionButtons";
import { useDeleteBlogMutation, useGetBlogQuery } from "../api/apiSlice";
const SingleBlog = () => {
  const { blogId } = useParams();
  const { data: blog, isFetching, isSuccess } = useGetBlogQuery(blogId);

  const navigate = useNavigate();
  const [deleteBlog] = useDeleteBlogMutation();
  const handleDelete = async () => {
    if (blog) {
      await deleteBlog(blogId);
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

  let content;
  if (isFetching) {
    content = <Spinner text="درحال بارگذاری ..." />;
  } else if (isSuccess) {
    content = (
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
    );
  }

  return <section>{content}</section>;
};
export default SingleBlog;
