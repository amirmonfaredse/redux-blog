import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectBlogById, updateApiBlog } from "../reducers/blogSlice";

const EditBlogForm = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) => selectBlogById(state, blogId));
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  if (!blog) {
    return (
      <section>
        <h2>پستی که دنبالش میگردی رو پیدا نکردیم</h2>
      </section>
    );
  }
  const handleSubmitForm = () => {
    if (title && content) {
      dispatch(
        updateApiBlog({
          id: blogId,
          date: blog.date,
          title,
          content,
          user: blog.user,
          reactions: blog.reactions,
        })
      );
      navigate(`/blogs/${blogId}`);
    }
  };
  return (
    <section>
      <h2>ویرایش پست</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست</label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="blogContent">محتوای اصلی</label>
        <textarea
          id="blogContent"
          name="blogContent"
          onChange={onContentChange}
          value={content}
        />
        <button type="button" onClick={handleSubmitForm}>
          ذخیره
        </button>
      </form>
    </section>
  );
};
export default EditBlogForm;
