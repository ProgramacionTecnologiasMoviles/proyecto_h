import { useContext, useState } from "react";
import { AuthContext } from "../contexts/WebSocketContext";
import { updateUserData } from "../services/UserService";

export const useEditDataUser = () => {
  const { user } = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    console.log("editing");
    setEditing(false);
    // updateUserData({ fullname, email, editing }, user.id);
  };

  return { user, editing, setEditing, handleEdit };
};
