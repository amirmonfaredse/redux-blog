import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useAddNewBlogMutation } from "../api/apiSlice";
const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [addNewBlog, { isLoading }] = useAddNewBlogMutation();
  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);
  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const handleSubmitForm = async () => {
    if (canSave) {
      try {
        await addNewBlog({
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId,
          reactions: {
            like: 0,
            thumbsUp: 0,
            helpless: 0,
            sad: 0,
            thinking: 0,
          },
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("Failed To save Blog", error);
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
