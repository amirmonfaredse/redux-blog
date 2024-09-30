import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAllUsers,
  useAddNewUserMutation,
  useDeleteUserMutation,
} from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";
const Authors = () => {
  const [user, setUser] = useState("");

  const authors = useSelector(selectAllUsers);
  const [addNewUser] = useAddNewUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const onUserChage = (e) => setUser(e.target.value);
  const canSave = Boolean(user);
  const handleSubmitForm = async () => {
    if (canSave) {
      try {
        await addNewUser({ id: nanoid(), fullName: user });
        setUser("");
      } catch (error) {
        console.log("Failed To Save Blog", error);
      }
    }
  };
  const handleDelete = (userId) => {
    deleteUser(userId);
  };
  return (
    <>
      <section>
        <h2>لیست نویسندگان</h2>
        <ul style={{ listStyle: "none" }}>
          {authors.map((user) => (
            <div key={user.id}>
              <Link
                to={`/users/${user.id}`}
                className="button"
                style={{ margin: "5px" }}
              >
                <li>{user.fullName}</li>
              </Link>
              <Link
                onClick={() => handleDelete(user.id)}
                style={{ color: "#333" }}
              >
                &otimes;
              </Link>
            </div>
          ))}
        </ul>
        <form autoComplete="off">
          <label htmlFor="user">
            <input
              type="text"
              name="user"
              id="user"
              value={user}
              onChange={onUserChage}
            />
            <button
              type="button"
              onClick={handleSubmitForm}
              disabled={!canSave}
            >
              ساخت نویسنده جدید{" "}
            </button>
          </label>
        </form>
      </section>
    </>
  );
};
export default Authors;
