import React from "react";

const OptionWithCheckBox = (props) => {
  const {
    innerProps: { onClick, ...rest },
    label,
    isSelected,
    data,
  } = props;

  return (
    <div
      {...rest}
      className="form-check custom-checkbox-option d-flex custom-checkbox"
      onClick={() => {
        if (!data.disabled) onClick();
      }}
    >
      <input
        checked={isSelected}
        onChange={() => null}
        type="checkbox"
        className="form-check-input custom-control-input"
        disabled={data.disabled}
      />
      <label className="form-check-label custom-control-label">{label}</label>
    </div>
  );
};

export { OptionWithCheckBox };
