import React, { useRef, useState, useEffect } from "react";
import { components } from "react-select";
import onClickOutside from "react-onclickoutside";

/**
 * this cannot be changed into an arrow function
 * because of react-onClickoutside
 */
function Main(props) {
  const {
    children,
    selectProps: {
      name,
      onMenuFocus,
      onSearchInputChange,
      searchInput,
      onInputChange,
      onSearchMenuClose,
      value,
    },
  } = props;
  const inputRef = useRef();
  const valueRef = useRef(value);
  const prevMenu = useRef("");

  useEffect(() => {
    valueRef.current = value;
  });
  /**handle outside click */
  Main.handleClickOutside = (rest) => {
    if (prevMenu.current) {
      if (typeof onSearchInputChange === "function") {
        onSearchInputChange("");
      }
      if (typeof onSearchMenuClose === "function") {
        onSearchMenuClose({ value: valueRef.current });
      }
      onInputChange("");
      onMenuFocus(false);
    }
    prevMenu.current = true;
  };

  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    e.persist();
    if (typeof onSearchInputChange === "function") {
      onSearchInputChange(e.target.value);
    } else {
      setInputVal(e.target.value);
      onInputChange(e.target.value);
    }
  };

  return (
    <components.Menu {...props}>
      <div className="form-group mb-0 custom-select-search">
        <label htmlFor={`${name}_search`} className="sr-only"></label>
        <input
          ref={inputRef}
          type="text"
          className="form-control form-control-sm"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          id={`${name}_search`}
          name={`${name}_search`}
          onFocus={() => onMenuFocus(true)}
          value={searchInput ? searchInput : inputVal}
          onChange={handleInputChange}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.target.focus();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.target.focus();
          }}
          /**
           * preventing the default behaviour of space bar
           * otheriwse the first option will be selected when
           * the space bar is pressed inside the input box
           */
          onKeyDown={(e) => {
            e.stopPropagation();
            /**not needed, but an extra check for space bar press */
            // if (e.keyCode === 32 && !searchInput) e.preventDefault();
          }}
        />
      </div>
      {children}
    </components.Menu>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Main.handleClickOutside,
};

const SearchMenuList = onClickOutside(Main, clickOutsideConfig);

Main.displayName = "SearchMenuList";

export { SearchMenuList };
