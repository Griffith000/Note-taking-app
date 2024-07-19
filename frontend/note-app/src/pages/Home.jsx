import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "../components/AddEditNote";
import axiosInstance from "../utils/axiosInstance.js";
import ToastMessage from "../components/ToastMessage.jsx";
import EmptyCard from "../components/EmptyCard.jsx";
import react from "../assets/react.svg";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    type: "add",
    message: "",
  });
  let savedUserInfo = null;
  let savedNotes = null;

  useEffect(() => {
    savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    } else {
      getUserInfo();
    }
  }, [savedUserInfo]);
  useEffect(() => {
    savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      getNotes();
    }
  }, [savedNotes]);
  const handleCloseToast = () => {
    setShowToastMessage({
      isShown: false,
      message: "",
    });
  };
  const handleShowToast = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message: message,
      type: type,
    });
  };

  const handleEdit = (note) => {
    setOpenAddEditModel({
      isShown: true,
      type: "edit",
      data: note,
    });
  };
  const handleOnPinNote = async (noteId) => {
    try {
      await axiosInstance.put("/api/note/pin-note/" + noteId);
      getNotes();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (noteId) => {
    try {
      await axiosInstance.delete("/api/note/delete-note/" + noteId);
      handleShowToast("Successfully deleted note", "delete");
      await getNotes();
    } catch (error) {
      console.log(error.message);
    }
  };
  const getNotes = async () => {
    try {
      if (!userInfo) {
        console.log("userInfo is null, fetching user info...");
        await getUserInfo(); // Assuming this method correctly sets userInfo
      }
      const res = await axiosInstance.get("/api/note/get-notes");
      setNotes(res.data);
      savedNotes = localStorage.setItem("notes", JSON.stringify(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/get-user");
      setUserInfo(res.data);
      savedUserInfo = localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10 md:mx-7 sm:mx-1">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdOn}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onDelete={() => {
                  handleDelete(note._id);
                }}
                onEdit={() => {
                  handleEdit(note);
                }}
                onPinNote={() => {
                  handleOnPinNote(note._id);
                }}
              />
            ))
          ) : (
            <EmptyCard
              image={react}
              caption={
                "Lets create our fist note just click the add button at the bottom"
              }
            />
          )}
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
          handleShowToast={handleShowToast}
          getAddedNote={getNotes}
        />
      ) : null}
      {/* {!openAddEditModel.isShown && showToastMessage.isShown ? (
        <ToastMessage onClose={handleCloseToast} isShown={showToastMessage.isShown} message={showToastMessage.message} type={showToastMessage.type } />
      ) : null} */}
      <ToastMessage
        onClose={handleCloseToast}
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
      />
    </div>
  );
};

export default Home;
