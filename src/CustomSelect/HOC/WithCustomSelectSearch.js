import React, { useState } from "react";
import { SearchMenuList } from "../SearchMenuList";

function withCustomSelectSearch(Component) {
  return React.forwardRef(function (props, ref) {
    const { components, onChange, ...rest } = props;
    const [isFocused, setisFocused] = useState(false);

    return (
      <Component
        {...rest}
        onChange={(value, meta) => {
          onChange(value, meta);
          if (rest.closeMenuOnSelect) {
            setisFocused(false);
            if (typeof onSearchMenuClose === "function") {
              rest.onSearchMenuClose({ value: value });
            }
          }
        }}
        ref={ref}
        isSearchable={false}
        isFocused={isFocused || undefined}
        menuIsOpen={isFocused || undefined}
        onMenuFocus={(val) => setisFocused(val)}
        components={{ ...components, Menu: SearchMenuList }}
        onSearchMenuClose={rest.onSearchMenuClose}
      />
    );
  });
}

export { withCustomSelectSearch };
