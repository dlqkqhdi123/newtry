import React from "react";

const AuthContext = React.createContext({
  isLogin: false,
  memberObj: null,
  logout: () => {},
});

export default AuthContext;
