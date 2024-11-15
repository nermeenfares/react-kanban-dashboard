// import React, { createContext, useReducer, ReactNode } from "react";

// export interface Member {
//   id: string;
//   name: string;
//   title: string;
//   age: number;
//   email: string;
//   mobile: string;
//   status: "Unclaimed" | "First Contact" | "Preparing Work Offer" | "Send to Therapist";
// }

// interface MemberState {
//   members: Member[];
// }

// type MemberAction =
//   | { type: "ADD_MEMBER"; payload: Member }
//   | { type: "UPDATE_MEMBER"; payload: Member }
//   | { type: "DELETE_MEMBER"; payload: {id:string} } 
//   | { type: "UPDATE_STATUS"; payload: { id: string; status: Member["status"] } };


// const initialState: MemberState = {
//   members: [],
// };

// const memberReducer = (state: MemberState, action: MemberAction): MemberState => {
//   switch (action.type) {
//     case "ADD_MEMBER":
//       return { ...state, members: [...state.members, action.payload] };
      
//     case "DELETE_MEMBER":
//       return {
//         ...state,
//         members: state.members.filter((member) => member.id !== action.payload.id),
//       };
//     case "UPDATE_STATUS":
//       return {
//         ...state,
//         members: state.members.map((member) =>
//           member.id === action.payload.id ? { ...member, status: action.payload.status } : member
//         ),
//       };
//     default:
//       return state;
//   }
// };


// const MemberContext = createContext<{
//     state: MemberState;
//     dispatch: React.Dispatch<MemberAction>;
//   }>({
//     state: { members: [] },
//     dispatch: () => {
//       throw new Error("dispatch must be used within a MemberProvider");
//     },
//   });
  

// export const useMemberContext = () => React.useContext(MemberContext);

// interface MemberProviderProps {
//   children: ReactNode;
// }

// export const MemberProvider = ({ children }: MemberProviderProps) => {
//   const [state, dispatch] = useReducer(memberReducer, initialState);

//   return (
//     <MemberContext.Provider value={{ state, dispatch }}>
//       {children}
//     </MemberContext.Provider>
//   );
// };


import React, { createContext, useReducer, ReactNode } from "react";

export interface Member {
  id: string;
  name: string;
  title: string;
  age: number;
  email: string;
  mobile: string;
  status: "Unclaimed" | "First Contact" | "Preparing Work Offer" | "Send to Therapist";
}

interface MemberState {
  members: Member[];
}

type MemberAction =
  | { type: "ADD_MEMBER"; payload: Member }
  | { type: "UPDATE_MEMBER"; payload: Member }
  | { type: "DELETE_MEMBER"; payload: { id: string } }
  | { type: "UPDATE_STATUS"; payload: { id: string; status: Member["status"] } };

const initialState: MemberState = {
  members: [],
};

const memberReducer = (state: MemberState, action: MemberAction): MemberState => {
  switch (action.type) {
    case "ADD_MEMBER":
      return { ...state, members: [...state.members, action.payload] };
    case "UPDATE_MEMBER":
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.payload.id ? action.payload : member
        ),
      };
    case "DELETE_MEMBER":
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload.id),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.payload.id ? { ...member, status: action.payload.status } : member
        ),
      };
    default:
      return state;
  }
};

export const MemberContext = createContext<{
  state: MemberState;
  dispatch: React.Dispatch<MemberAction>;
}>({
  state: { members: [] },
  dispatch: () => {
    throw new Error("dispatch must be used within a MemberProvider");
  },
});

export const useMemberContext = () => React.useContext(MemberContext);

interface MemberProviderProps {
  children: ReactNode;
}

export const MemberProvider = ({ children }: MemberProviderProps) => {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  return (
    <MemberContext.Provider value={{ state, dispatch }}>
      {children}
    </MemberContext.Provider>
  );
};
