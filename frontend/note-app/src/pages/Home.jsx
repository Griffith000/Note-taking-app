import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "../components/AddEditNote";
import axiosInstance from "../utils/axiosInstance.js";
import ToastMessage from "../components/ToastMessage";
import EmptyCard from "../components/EmptyCard";
import noNotesFound from "/images/not-found.png";
import addNotes from "/images/add.png";

const Home = () => {
  const [isSearch, setIsSearch] = useState(false);
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
  const onClearSearch = async () => {
    try {
      await getNotes();
    } catch (error) {
      console.log(error.message);
    }
    setIsSearch(false);
  };
  const onSearchNote = async (query) => {
    try {
      setIsSearch(true);
      const res = await axiosInstance.get("/api/note/search-notes", {
        params: { query },
      });

      if (res.data && res.data.message === "Notes found") {
        setNotes(res.data.notes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.log(error.message);
      setNotes([]);
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
      if (res.data && res.data.message === "No notes found for this user") {
        setNotes([]);
        localStorage.setItem("notes", JSON.stringify([])); // Set local storage to an empty array
      } else {
        // Otherwise, update the notes state with the fetched notes
        setNotes(res.data);
        localStorage.setItem("notes", JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error.message);
      setNotes([]);
      localStorage.setItem("notes", JSON.stringify([]));
    }
  };
  useEffect(() => {}, [notes]);
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
      <Navbar
        onClearSearch={onClearSearch}
        onSearchNote={onSearchNote}
        userInfo={userInfo}
      />
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
              image={isSearch ? noNotesFound : addNotes}
              caption={
                isSearch
                  ? "No notes found for the search query, try again with a different search query"
                  : "Start creating your fist note, click the 'Add' button at the bottom right corner to jot down your thoughts and reminders ... let's get started!"
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
