import { useState } from "react";
import { useNavigate } from "react-router";
import "./menu.css";

function Menu() {
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  let navigate = useNavigate();

  return (
    <div className="menu">
      {localStorage.getItem("save") && (
        <button
          className="menu_btn"
          onClick={() => navigate("/game/countinue")}
        >
          Countinue
        </button>
      )}
      <button className="menu_btn" onClick={() => setIsShowConfirm(true)}>
        New game
      </button>

      {isShowConfirm && (
        <div className="menu-confirm-wrapper">
          <div className="menu-confirm">
            <h2>Confirm?</h2>
            <div className="menu-confirm_btn-raw">
              <button
                onClick={() => {
                  navigate("/game/new");
                  setIsShowConfirm(false);
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setIsShowConfirm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
