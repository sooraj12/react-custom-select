import React from "react";
import { components } from "react-select";

const MenuListWithProfile = (props) => {
  const {
    options,
    selectOption,
    selectProps: {
      noOptionsMessage,
      onMenuFocus,
      closeMenuOnSelect,
      listHeading,
      filterList,
      getUserName,
      getFullName,
    },
  } = props;

  const handleItemClick = (item) => {
    selectOption(item);
    if (closeMenuOnSelect && typeof onMenuFocus === "function") {
      onMenuFocus(false);
    }
  };

  const renderBadges = (privilages) => {
    const badges = privilages.split(",");
    return (
      <div className="skills">
        {badges.map((name) => (
          <span key={name} className={`badge badge-warning mr-1`}>
            name
          </span>
        ))}
      </div>
    );
  };

  const renderMenuItems = () => {
    const filteredOptions =
      typeof filterList === "function" ? filterList(options) : options;

    if (filteredOptions.length === 0) return renderNoOptions();

    return filteredOptions.map((item) => {
      return (
        <div
          key={getUserName(item)}
          className="user-info-list"
          onClick={() => handleItemClick(item)}
        >
          <div>
            <div className="profile-image">
              <img alt="profile img" />
            </div>
            <div className="user-info">
              {typeof getFullName === "function" && (
                <span className="user-name">{getFullName(item)}</span>
              )}
              <span className="user-email">{item.email}</span>
            </div>
          </div>
          <div>{item.skills && renderBadges(item.skills)}</div>
        </div>
      );
    });
  };

  const renderNoOptions = () => {
    return (
      <div className="user-info-empty">
        <p>{noOptionsMessage()}</p>
      </div>
    );
  };

  return (
    <components.MenuList {...props}>
      <div className="user-info-list-container">
        {options.some((i) => getUserName(i) !== "") ? (
          <>
            {listHeading && (
              <div className="list-heading">
                <strong>
                  <span>{listHeading}</span>
                </strong>
              </div>
            )}
            {renderMenuItems()}
          </>
        ) : (
          renderNoOptions()
        )}
      </div>
    </components.MenuList>
  );
};

export { MenuListWithProfile };
