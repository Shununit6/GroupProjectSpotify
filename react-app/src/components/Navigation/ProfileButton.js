import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div id="profileNavButtonMenuItem">
      {(!user) &&
        <div id="menuitemlogin">
          <OpenModalMenuItem
          itemText="Log In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
          />
        </div>
      }
      {(!user) &&
        <div id="menuitemsignup">
        <OpenModalMenuItem
        itemText="Sign Up"
        onItemClick={closeMenu}
        modalComponent={<SignupFormModal />}
        />
        </div>
      }
      <div id="iconandcloseopenmenu">
      {user && !showMenu &&
        <div id="openMenuNavButton" onClick={openMenu}>
          <i className="fas fa-user-circle fa-2x"/>
          <i className="fas fa-sort-down fa-2x"></i>
        </div>}
      {user && showMenu &&
        <div id="closeMenuNavButton" onClick={closeMenu}>
        <i className="fas fa-user-circle fa-2x"/>
        <i className="fas fa-sort-up fa-2x"></i>
        </div>}
      <section className={ulClassName} ref={ulRef}>
        {user ? (
          <div id="menuwithlogout">
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>
            {/* <div>
                 <Link id="menuviewsongs"to="/songs" > View songs </Link>
            </div> */}
            <div>
              <hr/>
              <div onClick={handleLogout}><Link id="menulogout" to="/" >Log Out</Link></div>
            </div>
          </div>
        ) : null}
      </section>
      </div>
    </div>
  );
}

//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={handleLogout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <OpenModalButton
//               buttonText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />

//             <OpenModalButton
//               buttonText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

export default ProfileButton;
