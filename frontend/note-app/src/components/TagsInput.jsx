import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

import PropTypes from "prop-types";

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
    }
    setInputValue("");
  };
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };
  const removeTag = (tagRoRemove) => {
    setTags([...tags.filter((tag) => tag !== tagRoRemove)]);
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <div
              className="flex justify-center align-baseline bg-slate-100 text-sm rounded-lg  px-2 py-1 mt-2 mb-1 "
              key={index}
            >
              <span className=" px-2  "># {tag}</span>
              <button>
                <MdClose
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    removeTag(tag);
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mb-4 mt-1 flex gap-4">
        <input
          onKeyDown={handleKeydown}
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          placeholder="Add a tag"
          className="bg-slate-50 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        <button
          onClick={(e) => {
            addNewTag(e);
          }}
          className="flex justify-center items-center h-10 bg-transparent  px-3 rounded-lg border border-primary  hover:bg-primary hover:text-white transition-all"
        >
          <MdAdd
            size={20}
            className="text-primary hover:text-white  cursor-pointer "
          />
        </button>
      </div>
    </div>
  );
};

export default TagsInput;
