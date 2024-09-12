/** @fanie__ */

import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { addPropertyControls, ControlType } from "framer";
import Lenis from "lenis"; // import Lenis from "@studio-freight/lenis"
import { useEffect, useRef } from "react";
/**
 * @framerDisableUnlink
 */ export default function SmoothScroll(props) {
  const { intensity } = props;
  const lenis = useRef(null);
  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true });
  }, [lenis]);
  useEffect(() => {
    const overlayElement = document.getElementById("overlay");
    if (overlayElement) {
      const handleMutation = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            const hasChildren = overlayElement.children.length > 0;
            if (hasChildren) {
              // Check if the html tag has the style "overflow: hidden;"
              const htmlElement = document.documentElement;
              const computedStyle = window.getComputedStyle(htmlElement);
              const isOverflowHidden =
                computedStyle.getPropertyValue("overflow") === "hidden";
              if (isOverflowHidden) {
                overlayElement.setAttribute("data-lenis-prevent", "true");
              }
            }
          }
        }
      };
      const observer = new MutationObserver(handleMutation);
      const config = { childList: true };
      observer.observe(overlayElement, config);
      return () => observer.disconnect();
    }
  }, []);
  useEffect(() => {
    const allElements = document.getElementsByTagName("*");
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.getPropertyValue("overflow") === "auto") {
        element.setAttribute("data-lenis-prevent", "true");
      }
    }
  }, []);
  useEffect(() => {
    lenis.current = new Lenis({ duration: intensity / 10 });
    const raf = (time) => {
      if (lenis.current) {
        lenis.current.raf(time);
        requestAnimationFrame(raf);
      }
    };
    requestAnimationFrame(raf);
    return () => {
      if (lenis.current) {
        lenis.current.destroy();
        lenis.current = null;
      }
    };
  }, []);
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
html.lenis {
height: auto;
}
.lenis.lenis-smooth {

scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {

overscroll-behavior: contain;
}
.lenis.lenis-stopped {

overflow: hidden;
}
.lenis.lenis-scrolling iframe {

pointer-events: none;
}
`;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  useEffect(() => {
    const anchorLinks = [...document.querySelectorAll("a[href]")];
    const handleClick = (e, href) => {
      e.preventDefault();
      const decodedHref = decodeURIComponent(href);
      lenis.current.scrollTo(decodedHref);
    };
    anchorLinks
      .filter((a) => a.href.includes("#"))
      .forEach((a) => {
        const href = `#${a.href.split("#").pop()}`;
        a.addEventListener("click", (e) => handleClick(e, href));
      });
    return () => {
      anchorLinks
        .filter((a) => a.href.includes("#"))
        .forEach((a) => {
          const href = `#${a.href.split("#").pop()}`;
          a.removeEventListener("click", (e) => handleClick(e, href));
        });
    };
  }, [lenis]);
  return /*#__PURE__*/ _jsx(_Fragment, {});
}
SmoothScroll.displayName = "Smooth Scroll";
addPropertyControls(SmoothScroll, {
  intensity: {
    title: "Intensity",
    type: ControlType.Number,
    defaultValue: 10,
    description:
      "More components at [Framer University](https://framer.university?utm_source=component).",
  },
});
export const __FramerMetadata__ = {
  exports: {
    default: {
      type: "reactComponent",
      name: "SmoothScroll",
      slots: [],
      annotations: { framerContractVersion: "1", framerDisableUnlink: "" },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
//# sourceMappingURL=./SmoothScroll_Prod.map
