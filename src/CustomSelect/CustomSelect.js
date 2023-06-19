import React from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";

import variables from "./CustomSelect.scss";

const CustomSelect = React.forwardRef(
  (
    {
      selectedOptions,
      name,
      async = true,
      components,
      error,
      className,
      getStyles,
      tourClass,
      ...rest
    },
    ref
  ) => {
    //custom styles for select
    const customStyles = {
      control: (styles, state) => ({
        ...styles,
        boxShadow:
          state.isFocused || state.isDisabled ? "none" : variables.boxShadow,
        borderColor: error
          ? "#ecc708"
          : state.isFocused
          ? variables.focusColor
          : "#c8c3c0",
        minHeight: "32px",
        // maxHeight: "34px",
        height: state.hasValue ? "auto" : "34px",
        border: state.isDisabled ? "none" : "",
        cursor: "text",
        ...requiredIcon(),
        "&:hover": {
          borderColor: error
            ? "#ecc708"
            : state.isFocused
            ? variables.hoverColor
            : "#c8c3c0",
        },
        ...overrideStyles("control"),
      }),

      placeholder: (styles, state) => ({
        ...styles,
        fontSize: "14px",
        color: variables.placeholderColor,
        paddingBottom: "6px",
        ...overrideStyles("placeholder"),
      }),

      dropdownIndicator: (styles, state) => ({
        ...styles,
        transition: "all .3s ease",
        transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : null,
        color: "#c8c3c0",
        cursor: "pointer",
        ...overrideStyles("dropdownIndicator"),
      }),

      multiValue: (style, state) => ({
        ...style,
        backgroundColor: variables.whiteColor,
        margin: "5px 5px 3px 3px",
        position: "relative",
      }),

      multiValueLabel: (style, state) => ({
        ...style,
        color: variables.blackColor,
        border: `1px solid ${variables.darkGray}`,
        borderRadius: "4px",
        padding: "5px 16px",
        paddingLeft: "16px",
      }),

      multiValueRemove: (style, state) => {
        return {
          ...style,
          backgroundColor: variables.redColor,
          padding: 0,
          borderRadius: "50%",
          color: variables.whiteColor,
          cursor: "pointer",
          fontSize: "12px",
          width: "14px",
          height: "14px",
          position: "absolute",
          right: -5,
          top: -5,

          "&:hover": {
            backgroundColor: variables.redColor,
            color: variables.whiteColor,
          },
        };
      },

      menuList: (style, state) => ({
        ...style,
        padding: "4px",

        "&::-webkit-scrollbar": {
          width: "4px",
          height: "4px",
          backgroundColor: "#f5f5f5",
        },

        "&::-webkit-scrollbar-track": {
          boxShadow: variables.trackShadow,
          WebkitBoxShadow: variables.trackShadow,
          backgroundColor: "#f5f5f5",
          borderRadius: "6px",
        },

        "&::-webkit-scrollbar-thumb": {
          backgroundColor: variables.mediumGray,
          borderRadius: "8px",
        },
        ...overrideStyles("menuList"),
      }),

      option: (styles, state) => ({
        ...styles,
        "&:hover": {
          cursor: "pointer",
        },
        ...overrideStyles("option"),
      }),
      menu: (styles, state) => ({
        ...styles,
        ...overrideStyles("menu"),
      }),
      group: (styles, state) => ({
        ...styles,
        paddingTop: "2px",
        paddingBottom: "0px",
      }),
      container: (styles, state) => ({
        ...styles,
        ...overrideStyles("container"),
      }),
      singleValue: (styles, state) => ({
        ...styles,
        ...overrideStyles("singleValue"),
      }),
      menuPortal: (base) => ({ ...base, zIndex: 99999 }),
    };

    const overrideStyles = (key) => {
      if (!getStyles) {
        return {};
      }

      const styles = getStyles[key];

      if (!styles) {
        return {};
      }

      return styles;
    };

    const requiredIcon = () => ({
      backgroundImage:
        className &&
        className.split(" ").includes("required-background") &&
        variables.backgroundImage,
      backgroundSize: variables.backgroundSize,
      backgroundPosition: variables.backgroundPosition,
      backgroundRepeat: variables.backgroundRepeat,
    });

    const commonProps = () => ({
      ref: ref,
      name: name,
      type: "text",
      components: {
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
        ...components,
      },
      isMulti: true,
      value: selectedOptions,
      styles: customStyles,
      maxMenuHeight: 250,
      tabSelectsValue: false,
      menuPortalTarget: document.body,
      menuPlacement: "auto",
      menuPosition: "absolute",
      className: tourClass,
      ...rest,
    });

    return async ? (
      <AsyncSelect {...commonProps()} />
    ) : (
      <Select {...commonProps()} />
    );
  }
);

export { CustomSelect };
