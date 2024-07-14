import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import TagsInput from "./TagsInput";
import { MdClose } from "react-icons/md";

import axios from "axios";
const AddEditNote = ({ noteData, type, onClose }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  
  const addNewNote = async () => {
    const res = await axios.post("/api/notes/add-note", {
      title,
      content,
      tags,
      isPinned,
      userId
    });
   
    return;
  };
  const EditNote = async () => {
    return;
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
    <div className="relative w-2/4 h-3/4">
      <div className="absolute -top-[150px] -right-[20rem] z-50  text-slate-900">
        <button onClick={onClose}>
          <MdClose size={22} className=" text-2xl cursor-pointer" />
        </button>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
        <div className=" bg-white w-2/4 h-3/4 rounded-lg px-7 py-11">
          <h1 className="text-xl font-semibold">Add Note</h1>
          <form className="mt-3">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                TITLE
              </label>
              <input
                placeholder="Go to Gym at 5AM"
                value={title}
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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditNote;
