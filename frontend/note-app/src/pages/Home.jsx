import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "../components/AddEditNote";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [userInfo , setUserInfo] = useState(null);
  const [openAddEditModel, setOpenAddEditModel] = React.useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/get-user");
      setUserInfo(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <NoteCard
            title={"Meeting on the 7th of April"}
            date={"3rd Apr 2024"}
            content={"Meeting on the 7th of April"}
            tags={["#Marketing"]}
            isPinned={true}
          />
        </div>
      </div>
      <button>
        <MdAdd
          onClick={() => {
            setOpenAddEditModel({
              isShown: true,
              type: "add",
              data: null,
            });
          }}
          size={53}
          className="absolute bottom-10 right-10 text-white bg-primary  rounded-lg px-3 py-3 hover:bg-primary-400 transition-all ease "
        />
      </button>
      {openAddEditModel.isShown ? (
        <AddEditNote
          type={openAddEditModel.type}
          noteData={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
        />
      ) : null}
    </div>
  );
};

export default Home;
