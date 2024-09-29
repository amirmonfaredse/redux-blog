import { Link, useNavigate } from "react-router-dom";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";
import { useMemo } from "react";

import Spinner from "./Spinner";
import { useGetBlogsQuery } from "../api/apiSlice";
const BlogsList = () => {
  const {
    data: blogs = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBlogsQuery();
  const navigate = useNavigate();
  const sortedBlogs = useMemo(() => {
    const sortedBlogs = blogs.slice();
    sortedBlogs.sort((a, b) => b.date.localeCompare(a.date));
    return sortedBlogs;
  }, [blogs]);
  let content;
  if (isLoading) {
    content = <Spinner text="بارگذاری ..." />;
  } else if (isSuccess) {
    content = sortedBlogs.map((blog) => (
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
  } else if (isError) {
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
