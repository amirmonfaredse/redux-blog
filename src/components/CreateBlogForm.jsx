import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBlog } from "../reducers/blogSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";
const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);
  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const handleSubmitForm = async () => {
    if (canSave) {
      try {
        setRequestStatus("pendeing");
        await dispatch(
          addNewBlog({
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              like: 0,
              thumsUp: 0,
              helpless: 0,
              sad: 0,
              thinking: 0,
            },
          })
        );
        console.log(userId);

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("Failed To save Blog", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  return (
    <section>
      <h2>ساخت پست جدید</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست</label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="blogAuthor">نویسند : </label>
        <select id="blogAuthor" value={userId} onChange={onAuthorChange}>
          <option value="">انتخاب نویسنده</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
        <label htmlFor="blogContent">محتوای اصلی</label>
        <textarea
          id="blogContent"
          name="blogContent"
          onChange={onContentChange}
          value={content}
        />
        <button disabled={!canSave} type="button" onClick={handleSubmitForm}>
          ذخیره
        </button>
      </form>
    </section>
  );
};
export default CreateBlogForm;
