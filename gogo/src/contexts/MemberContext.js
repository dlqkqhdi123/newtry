import { createContext, useContext, useState } from "react";

const MemberContext = createContext();

export function MemberProvider({ children }) {
  const [member, setMember] = useState();

  return (
    <MemberContext.Provider value={{ member, setMember }}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("반드시 MemberProvider 안에서 사용해야 합니다.");
  }

  return context.member;
}

export function useSetMember() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("반드시 MemberProvider 안에서 사용해야 합니다.");
  }

  return context.setMember;
}
