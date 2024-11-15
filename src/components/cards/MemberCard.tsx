import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Member, useMemberContext } from '../../context/MemberContext';
import CustomButton from '../buttons/CustomButton';

interface MemberCardProps {
  member: Member;
  index: number;
}

const MemberCard: React.FC<MemberCardProps> = ({ member , index}) => {
    
    const { dispatch } = useMemberContext();  
    const handleDelete = () => {
        dispatch({ type: 'DELETE_MEMBER', payload: { id: member.id } });
      };
  return (
    <Draggable draggableId={member.id.toString()} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-white border text-left border-gray-300 rounded-lg p-4 shadow-md"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-black font-bold text-lg">
            {member.name} 
          </span>
          <span  className="text-black  text-sm">{member.age} yo</span>
        </div>
        <p className="text-darkgray ">{member.email}</p>
        <p className="text-lightgray">{member.mobile}</p>
    <CustomButton onClick={handleDelete} className="text-red hover:bg-secondary hover:text-black bg-black" label='Delete' />
      </div>
      
    )}
  </Draggable>
  

  );
};

export default MemberCard;
