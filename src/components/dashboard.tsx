import {  useMemberContext } from '../context/MemberContext';
import CustomColumn from './CustomColumn'; 
import MemberForm from './forms/MemberForm';
import { DragDropContext } from '@hello-pangea/dnd';

export default function Dashboard() {
  const { state, dispatch } = useMemberContext();

  const onDragEnd = (result: { destination: any; source: any; }) => {
    const { destination, source } = result;
    if (!destination) return; 
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
  
    const statusMap = {
      unclaimed: "Unclaimed",
      firstContact: "First Contact",
      preparingWorkOffer: "Preparing Work Offer",
      sendToTherapist: "Send to Therapist"
    };
  
  
    const movedUser = state.members[source.index];
if (!movedUser) {
  console.error("Invalid source index:", source.index);
  return;
}

    const newStatus = (statusMap[destination.droppableId as keyof typeof statusMap] || "Send to Therapist") as "Unclaimed" | "First Contact" | "Preparing Work Offer" | "Send to Therapist";


    dispatch({
      type: "UPDATE_STATUS",
      payload: { id: movedUser.id, status: newStatus }
    });
    
    console.log("User status updated:", newStatus);
    console.log("Droppable ID:", destination.droppableId);
console.log("Mapped Status:", newStatus);

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
