import React from "react";
import { differenceWith, isEqual, isEmpty } from "lodash";

const GroupHeadingWithCheckbox = (props) => {
  const { selectProps, children } = props;

  const getNewOptions = (master, set) => {
    const difference = differenceWith(master, set, isEqual);

    // remove disabled options
    const withoutDisabled = difference.filter((option) => {
      return !option.disabled;
    });

    return withoutDisabled;
  };

  const handleSelectall = () => {
    if (!isGroupDisabled()) {
      const currentGroupOptions = getGroupOptions(selectProps.options);

      if (isChecked()) {
        const filteredValues = getNewOptions(
          selectProps.value,
          currentGroupOptions
        );
        selectProps.onChange(filteredValues, {
          action: "deselect-group-options", //might be useful later
        });
      } else {
        const removeValuesIfAny = getNewOptions(
          currentGroupOptions,
          selectProps.value
        );
        selectProps.onChange(
          [...(selectProps.value || []), ...removeValuesIfAny],
          {
            action: "select-group-options",
          }
        );
      }
    }
  };

  const getGroup = (arr) => arr.find((opt) => opt.label === children);

  const getGroupOptions = (arr) => getGroup(arr).options;

  const isGroupDisabled = () => {
    return getGroup(selectProps.options).disabled;
  };

  const isChecked = () => {
    const groupOptions = getGroupOptions(selectProps.options);
    const checked = isEmpty(
      differenceWith(groupOptions, selectProps.value, isEqual)
    );
    return checked;
  };

  return (
    <div className="form-check custom-groupHeading-checkbox custom-checkbox">
      <input
        checked={isChecked()}
        type="checkbox"
        className="form-check-input custom-control-input"
        onChange={handleSelectall}
        disabled={isGroupDisabled()}
      />
      <label
        onClick={handleSelectall}
        className="form-check-label custom-control-label"
      >
        {props.children}
      </label>
    </div>
  );
};

export { GroupHeadingWithCheckbox };
