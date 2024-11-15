import React from 'react';
import { Member, useMemberContext } from '../context/MemberContext';
import CustomColumn from './CustomColumn'; 
import MemberForm from './forms/MemberForm';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

 export default function Dashboard() {
   const { state, dispatch } = useMemberContext();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return; 

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const statusMap: Record<string, Member['status']> = {
      unclaimed: "Unclaimed",
      firstContact: "First Contact",
      preparingWorkOffer: "Preparing Work Offer",
      sendToTherapist: "Send to Therapist"
    };

    const newStatus = statusMap[destination.droppableId] || "Send to Therapist";

    const movedUser = state.members.find(member => member.id === draggableId);

    if (movedUser) {
      dispatch({
        type: "UPDATE_STATUS",
        payload: { id: movedUser.id, status: newStatus }
      });

      console.log("User status updated:", newStatus);
      console.log("Droppable ID:", destination.droppableId);
      console.log("Mapped Status:", newStatus);
    }
  };
  
   return (
    
       <div className="flex flex-col lg:flex-row p-5 h-screen bg-primary text-white gap-4">
         <MemberForm />
         <div className="flex flex-col w-full text-center">
           <div className="flex flex-col md:flex-row h-full justify-between gap-2">
             <DragDropContext onDragEnd={onDragEnd}>
               <CustomColumn
                 droppableId="unclaimed"
                 title="Unclaimed"
               />
               <CustomColumn
                 droppableId="firstContact"
                 title="First Contact"
               />
               <CustomColumn
                 droppableId="preparingWorkOffer"
                 title="Preparing Work Offer"
               />
               <CustomColumn
                 droppableId="sendToTherapist"
                 title="Send to Therapist"

               />
             </DragDropContext>
           </div>
         </div>
       </div>
   );
 }

