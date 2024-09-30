import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/userSlice";

// eslint-disable-next-line react/prop-types
const ShowAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId));
  
  return <span>توسط : {author ? author.fullName : "نویسنده ناشناس"} </span>;
};
export default ShowAuthor;
