import React from "react";
import { components } from "react-select";
import { groupBy } from "../utils";

const GroupedLabels = (props) => {
  const {
    children,
    hasValue,
    selectProps: { value, grouplabelBy, getOptionLabel },
  } = props;

  const inputChildren = React.Children.map(children, (child) => {
    /**removing multivalues from children and showing cusotm multivalue label */
    /**return placeholder and dummy input */
    if (child && (child.key === "placeholder" || !child.key)) {
      return React.cloneElement(child);
    }
  });

  const renderLabel = () => {
    const values = groupBy(value, grouplabelBy);

    let groupedLabels = [];

    for (let key in values) {
      const label = values[key].map((val) => getOptionLabel(val)).join(",");
      const labelHtml = (
        <div className="grouped-label-container" key={key}>
          <div className="grouped-label">
            <span className="bold-text"> {`${key} : [`}</span>
            <span>{label}</span>
            <span className="bold-text">{`]`}</span>
          </div>
        </div>
      );
      groupedLabels = [...groupedLabels, labelHtml];
    }

    return <>{groupedLabels}</>;
  };

  return (
    <components.ValueContainer {...props}>
      {hasValue && renderLabel()}
      {inputChildren}
    </components.ValueContainer>
  );
};

export { GroupedLabels };
