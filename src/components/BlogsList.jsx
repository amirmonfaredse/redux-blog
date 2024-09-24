import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchBlogs,
  selectAllBlogs,
  selectStatus,
} from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";
import { useEffect } from "react";

import Spinner from "./Spinner";
const BlogsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);

  const blogStatus = useSelector(selectStatus);
  const error = useSelector((state) => state.error);
  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  let content;
  if (blogStatus === "loading") {
    content = <Spinner text="بارگذاری ..." />;
  } else if (blogStatus === "success") {
    const orderedBlogs = blogs
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedBlogs.map((blog) => (
      <article className="blog-excerpt" key={blog.id}>
        <h3>{blog.title}</h3>
        <div>
          <ShowAuthor userId={blog.user} />
          <ShowTime timestamp={blog.date} />
        </div>
        <p className="blog-content">{blog.content.substring(0, 100)}</p>
        <ReactionButtons blog={blog} />
        <Link to={`blogs/${blog.id}`} className="button muted-button">
          ادامه مطلب
        </Link>
      </article>
    ));
  } else if (blogStatus === "failed") {
    content = <div>{error}</div>;
  }
  return (
    <section className="blog-list">
      <button
        className="full-button accent-button"
        style={{ margin: 20 }}
        onClick={() => navigate("/blogs/create-blog")}
      >
        ساخت پست جدید
      </button>
      <h2>تمامی پست ها</h2>
      {content}
    </section>
  );
};
export default BlogsList;
