import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";


export default function ProtectedRoute({
  children,
}) {

  const location =
    useLocation();

  const reduxToken =
    useSelector(
      (state) =>
        state.auth.token
    );


  const token =
    reduxToken ||
    localStorage.getItem(
      "token"
    );


  if (!token) {

    return (

      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />

    );

  }


  return children;

}