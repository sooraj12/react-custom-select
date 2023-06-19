import React from "react";
import { components } from "react-select";

function SingleValueWithProfile(props) {
  const {
    children,
    data,
    selectProps: { getUserName, isMulti },
  } = props;

  const renderSingleValue = () => {
    return (
      <div className="singleValue-profile-container">
        <div className="profile-image">
          <img alt="profile img" />
        </div>
        <span>{children}</span>
      </div>
    );
  };

  return isMulti ? (
    <components.MultiValue {...props}>
      {getUserName(data) && renderSingleValue()}
    </components.MultiValue>
  ) : (
    <components.SingleValue {...props}>
      {getUserName(data) && renderSingleValue()}
    </components.SingleValue>
  );
}

export { SingleValueWithProfile };
