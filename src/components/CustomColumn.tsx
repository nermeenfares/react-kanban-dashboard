import React, { useMemo } from "react";
import MemberCard from "./cards/MemberCard";
import { useMemberContext } from "../context/MemberContext";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface CustomColumnProps {
  title: string;
  droppableId: string;
}

const CustomColumn: React.FC<CustomColumnProps> = ({ title, droppableId }) => {
  const { state } = useMemberContext();
  const filteredUsers = useMemo(() => {
    return state.members.filter((user) => user.status === title);
  }, [state.members, title]);

  const numberOfCards = filteredUsers.length;

  return (
    <div className="flex-1 bg-secondary">
      <div className="p-2 mb-0 flex items-center justify-between bg-secondary text-black">
        <span className="text-lg font-bold">{title}</span>
        <span className="flex items-center justify-center w-10 h-10 bg-white text-black font-bold rounded-full shadow">
          {numberOfCards}
        </span>
      </div>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-secondary border border-none h-full mt-2 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-transparent"
          >
            {filteredUsers.map((user, index) => (
              <Draggable key={user.id} draggableId={user.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-4"
                  >
                    <MemberCard member={user} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CustomColumn;
