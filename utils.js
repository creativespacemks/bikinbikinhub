/** @fanie__*/

import { useMemo } from "react";
import { ControlType } from "framer";
/*
 ** ICON UTILS
 ** Pull as much re-usable logic into here as possible
 ** This will make it easier to replace in all icon components
 */ export const containerStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const defaultEvents = {
  onClick: { type: ControlType.EventHandler },
  onMouseDown: { type: ControlType.EventHandler },
  onMouseUp: { type: ControlType.EventHandler },
  onMouseEnter: { type: ControlType.EventHandler },
  onMouseLeave: { type: ControlType.EventHandler },
};
const findByArray = (arr, search) =>
  arr.find((a) => a.toLowerCase().includes(search));
export function getIconSelection(
  iconKeys,
  selectByList,
  iconSearch = "",
  iconSelection,
  lowercaseIconKeyPairs
) {
  // gotta get the exact match first THEN find
  // have a set and try to access ?
  if (selectByList) return iconSelection;
  if (
    iconSearch == null ||
    (iconSearch === null || iconSearch === void 0
      ? void 0
      : iconSearch.length) === 0
  )
    return null;
  const iconSearchTerm = iconSearch.toLowerCase().replace(/-|\s/g, "");
  var _iconSearchTerm; // check for exact match, otherwise use .find
  const searchResult =
    (_iconSearchTerm = lowercaseIconKeyPairs[iconSearchTerm]) !== null &&
    _iconSearchTerm !== void 0
      ? _iconSearchTerm
      : findByArray(iconKeys, iconSearchTerm);
  return searchResult;
}
export function useIconSelection(
  iconKeys,
  selectByList,
  iconSearch = "",
  iconSelection,
  lowercaseIconKeyPairs
) {
  // Clean search term
  const iconSearchResult = useMemo(() => {
    if (
      iconSearch == null ||
      (iconSearch === null || iconSearch === void 0
        ? void 0
        : iconSearch.length) === 0
    )
      return null;
    const iconSearchTerm = iconSearch.toLowerCase().replace(/-|\s/g, "");
    var _iconSearchTerm; // check for exact match, otherwise use .find
    const searchResult =
      (_iconSearchTerm = lowercaseIconKeyPairs[iconSearchTerm]) !== null &&
      _iconSearchTerm !== void 0
        ? _iconSearchTerm
        : findByArray(iconKeys, iconSearchTerm);
    return searchResult;
  }, [iconSelection, iconSearch]);
  const name = selectByList ? iconSelection : iconSearchResult;
  return name;
}
export const __FramerMetadata__ = {
  exports: {
    getIconSelection: {
      type: "function",
      annotations: { framerContractVersion: "1" },
    },
    containerStyles: {
      type: "variable",
      annotations: { framerContractVersion: "1" },
    },
    useIconSelection: {
      type: "function",
      annotations: { framerContractVersion: "1" },
    },
    defaultEvents: {
      type: "variable",
      annotations: { framerContractVersion: "1" },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
//# sourceMappingURL=./utils.map
