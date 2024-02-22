import React, { createContext, useContext, useState, useEffect } from "react";

const MemberContext = createContext();

export function MemberProvider({ children }) {
  const storedMember = localStorage.getItem("member");
  const initialMember = storedMember
    ? JSON.parse(storedMember)
    : { userData: null };
  const [member, setMember] = useState(initialMember);

  useEffect(() => {
    const storedMember = localStorage.getItem("member");

    if (storedMember) {
      setMember(JSON.parse(storedMember));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("member", JSON.stringify(member));
  // }, [member]);

  const fetchUserInfo = async () => {
    try {
      const storedMember = localStorage.getItem("member");

      if (storedMember) {
        setMember(JSON.parse(storedMember));
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <MemberContext.Provider value={{ member, setMember, fetchUserInfo }}>
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

export function useFetchUserInfo() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("반드시 MemberProvider 안에서 사용해야 합니다.");
  }

  return context.fetchUserInfo;
}
