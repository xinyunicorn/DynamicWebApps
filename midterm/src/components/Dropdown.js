// referenced comp-lib-dropdown lecture to implement dropdown component

import {useState, useEffect, useRef} from "react";

// dropdown component for selecting background color
function Dropdown(props) {
  const {options, onChange, value} = props;

  // manage dropdown open/close state
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // toggle dropdown open/close
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // handle selecting a color option
  const handleOptionClick = (option) => {
    // close dropdown
    setIsOpen(false);
    // notify parent (App.js)
    onChange(option);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="dropdown-container" ref={ref}>
      {/* dropdown header */}
      <div
        className="panel"
        onClick={handleClick}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* show selected color label or “Select...” */}
        {value ? value.label : "Select..."} ▼
      </div>

      {/* dropdown options */}
      {isOpen && (
        <div className="panel">
          {options.map((opt, idx) => {
            // handle hover style changes
            const handleMouseEnter = (e) => (e.target.style.backgroundColor = "#e0f0ff");
            const handleMouseLeave = (e) => (e.target.style.backgroundColor = "white");

            return (
              <div
                key={idx}
                onClick={() => handleOptionClick(opt)}
                style={{ padding: "5px", cursor: "pointer" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
