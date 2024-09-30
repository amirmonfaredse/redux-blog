import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../reducers/userSlice";
import { selectUserBlogs } from "../reducers/blogSlice";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useGetBlogsQuery } from "../api/apiSlice";
const AuthorPages = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  const selectUserBlogs = useMemo(() => {
    const emptyArray = [];
    return createSelector(
      (res) => res.data,
      (res, userId) => userId,
      (data, userId) =>
        data?.filter((blog) => blog.user === userId) ?? emptyArray
    );
  }, []);
  const { userBlogs } = useGetBlogsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      userBlogs: selectUserBlogs(result, userId),
    }),
  });
  const blogTitles = userBlogs.map((blog) => (
    <li
      key={blog.id}
      style={{
        width: 250,
        height: 50,
        background: "#333",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
      }}
    >
      <Link
        to={`/blogs/${blog.id}`}
        style={{ color: "#fff", textDecoration: "none" }}
      >
        {blog.title}
      </Link>
    </li>
  ));

  return (
    <section>
      <h2>{user.fullName}</h2>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {userBlogs.length > 0 ? (
          blogTitles
        ) : (
          <li>این نویسنده تاکنون پستی منتشر نکرده است</li>
        )}
      </ul>
    </section>
  );
};
export default AuthorPages;
