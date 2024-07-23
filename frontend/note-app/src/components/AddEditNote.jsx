import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagsInput from "./TagsInput";
import { MdClose } from "react-icons/md";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import PropTypes from "prop-types";

const AddEditNote = ({
  noteData,
  type,
  onClose,
  getAddedNote,
  handleShowToast,
}) => {
  // const navigate = useNavigate(); // Commented out to remove the unused variable
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [isPinned, setIsPinned] = useState(noteData?.isPinned || false); // Commented out to remove the unused variable

  const addNewNote = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Ensure userInfo is parsed correctly from string
    const userId = userInfo?._id;
    const token = userInfo?.token; // Assuming the token is stored in userInfo

    try {
      const res = await axiosInstance.post(
        "/api/note/add-note",
        {
          title,
          content,
          tags,
          isPinned,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      if (res.data) {
        handleShowToast("Successfully added note", "success");
        getAddedNote();
        onClose();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      setError(errorMessage);
    }
  };
  const EditNote = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Ensure userInfo is parsed correctly from string
    const userId = userInfo?._id;
    const token = userInfo?.token; // Assuming the token is stored in userInfo

    try {
      const res = await axiosInstance.put(
        "/api/note/edit-note/" + noteData._id,
        {
          title,
          content,
          tags,
          isPinned,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      if (res.data) {
        handleShowToast("Successfully updated note", "success");
        getAddedNote();
        onClose();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      setError(errorMessage);
    }
  };
  const handleAddNote = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }

    setError(null);
    if (type === "edit") {
      // edit note
      EditNote();
    } else {
      // add note
      addNewNote();
    }
  };

  return (
    <div className=" w-3/4 h-4/5 min-h-[500px]">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
        <div className="bg-white w-2/4 h-3/4 min-h-[500px] rounded-lg px-7 py-11 relative">
      <div className="absolute top-10 right-16 z-50  text-slate-900">
        <button onClick={onClose}>
          <MdClose size={22} className="text-2xl cursor-pointer" />
        </button>
      </div>
          <h1 className="text-xl font-semibold">Add Note</h1>
          <form className="mt-3">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                TITLE
              </label>
              <input
                placeholder="Go to Gym at 5AM"
                value={title}
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                className="bg-slate-50 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Content
              </label>
              <textarea
                placeholder="Content"
                value={content}
                id="content"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="bg-slate-50 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                rows="6"
              ></textarea>
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Tags
              </label>
              <TagsInput
                id="tags"
                tags={tags}
                setTags={setTags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
              />
            </div>
            {error && <div className="text-red-500 m-1">{error}</div>}
            <div className="">
              <button
                onClick={(e) => {
                  handleAddNote(e);
                }}
                type="submit"
                className="w-full mt-1 bg-primary text-white px-4 py-2 rounded-lg"
              >
                {type === "edit" ? "UPDATE" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AddEditNote.propTypes = {
  noteData: PropTypes.object,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  getAddedNote: PropTypes.func.isRequired,
  handleShowToast: PropTypes.func.isRequired,
};

export default AddEditNote;
