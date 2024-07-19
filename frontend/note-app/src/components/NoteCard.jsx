import React from "react";
import PropTypes from "prop-types";
import { MdOutlinePushPin } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onDelete,
  onEdit,
  onPinNote,
}) => {
  return (
    <div className="px-5 py-5 w-full border border-slate-300 rounded-lg hover:shadow-lg transition-all ease-in-out">
      <div className="flex justify-between ">
        <div className="card-header">
          <h2>{title}</h2>
          <h3 className="text-slate-400 text-sm">
            {moment(date).format("MMM Do YYYY")}
          </h3>
        </div>
        <MdOutlinePushPin
          size={22}
          onClick={onPinNote}
          className={isPinned ? "text-red-500" : "text-primary"}
        />
      </div>
      <p>{content}</p>
      <div className="flex justify-between text-slate-400">
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <MdEdit
            size={22}
            onClick={onEdit}
            className="hover:text-green-500 transition"
          />
          <MdDelete
            size={22}
            onClick={onDelete}
            className="hover:text-red-500 transition"
          />
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPinned: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPinNote: PropTypes.func.isRequired,
};

export default NoteCard;
