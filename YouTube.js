/** @fanie__ */

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useReducer, useState } from "react";
import { ControlType, addPropertyControls } from "framer";
import {
  useIsOnCanvas,
  emptyStateStyle,
  containerStyles,
  defaultEvents,
  useRadius,
  borderRadiusControl,
} from "https://framer.com/m/framer/default-utils.js@^0.45.0";
var PlayOptions;
(function (PlayOptions) {
  PlayOptions["Normal"] = "Off";
  PlayOptions["Auto"] = "On";
  PlayOptions["Loop"] = "Loop";
})(PlayOptions || (PlayOptions = {}));
var ThumbnailOptions;
(function (ThumbnailOptions) {
  ThumbnailOptions["High"] = "High Quality";
  ThumbnailOptions["Medium"] = "Medium Quality";
  ThumbnailOptions["Low"] = "Low Quality";
  ThumbnailOptions["Off"] = "Off";
})(ThumbnailOptions || (ThumbnailOptions = {}));
var ThumbnailFormat;
(function (ThumbnailFormat) {
  ThumbnailFormat["WebP"] = "webp";
  ThumbnailFormat["JPG"] = "jpg";
})(ThumbnailFormat || (ThumbnailFormat = {}));
/**
 * @framerIntrinsicWidth 560
 * @framerIntrinsicHeight 315
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 *
 * @framerComponentPresetProps isRed, borderRadius
 */ export function Youtube({
  url,
  play,
  shouldMute,
  thumbnail,
  isRed,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  title,
  ...props
}) {
  const onCanvas = useIsOnCanvas();
  const isAutoplay = play !== "Off";
  const showThumbnail = onCanvas || (thumbnail !== "Off" && !isAutoplay);
  const [isPreloading, preloadVideo] = useReducer(() => true, false);
  const [showVideo, startVideo] = useReducer(() => true, !showThumbnail);
  const [isHovered, setHovered] = useState(false);
  const borderRadius = useRadius(props);
  const hasBorderRadius =
    borderRadius !== "0px 0px 0px 0px" && borderRadius !== "0px";
  if (url === "") {
    return /*#__PURE__*/ _jsx(Instructions, {});
  }
  const parsedURL = parseVideoURL(url);
  if (parsedURL === undefined) {
    return /*#__PURE__*/ _jsx(ErrorMessage, {
      message: "Invalid Youtube URL.",
    });
  }
  const [videoId, embedURL] = parsedURL; // https://developers.google.com/youtube/player_parameters
  const searchParams = embedURL.searchParams;
  searchParams.set("iv_load_policy", "3");
  searchParams.set("rel", "0");
  searchParams.set("modestbranding", "1");
  searchParams.set("playsinline", "1");
  if (!showVideo) {
    // if a browser does not support `loading=lazy`, make sure the video doesn't start playing in the background
    searchParams.set("autoplay", "0");
  } else if (
    isAutoplay || // when there is no thumbnail, we don't want to autoplay, unless video is started
    (showThumbnail && showVideo)
  ) {
    searchParams.set("autoplay", "1");
  }
  if (isAutoplay && shouldMute) {
    searchParams.set("mute", "1");
  }
  if (play === "Loop") {
    searchParams.set("loop", "1");
    searchParams.set("playlist", videoId);
  }
  if (!isRed) {
    searchParams.set("color", "white");
  }
  const iframeProps = {
    title: title || "Youtube Video",
    allow:
      "presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
    src: embedURL.href,
    frameBorder: "0",
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
  };
  return /*#__PURE__*/ _jsxs("article", {
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
    onPointerOver: preloadVideo,
    onKeyDown: startVideo,
    onClick: startVideo,
    style: {
      ...wrapperStyle,
      borderRadius,
      // Safari sometimes struggles to render border-radius:
      transform:
        // - on the canvas when changing from 0 to any other value
        // - or when rendering an iframe
        hasBorderRadius && (showVideo || onCanvas)
          ? "translateZ(0.000001px)"
          : "unset",
      cursor: "pointer",
      overflow: "hidden",
    },
    role: "presentation",
    children: [
      isPreloading &&
        /*#__PURE__*/ _jsx("link", {
          rel: "preconnect",
          href: "https://www.youtube.com",
        }),
      isPreloading &&
        /*#__PURE__*/ _jsx("link", {
          rel: "preconnect",
          href: "https://www.google.com",
        }),
      /*#__PURE__*/ _jsx("div", {
        style: {
          ...videoStyle,
          background: showThumbnail
            ? `center / cover url(${getThumbnailURL(
                videoId,
                thumbnail,
                getWebPSupported() ? "webp" : "jpg"
              )}) no-repeat`
            : undefined,
        },
      }),
      !onCanvas
        ? /*#__PURE__*/ _jsx("iframe", {
            loading: !showVideo ? "lazy" : undefined,
            style: !showVideo ? { ...videoStyle, display: "none" } : videoStyle,
            ...iframeProps,
          })
        : null,
      showVideo
        ? null
        : /*#__PURE__*/ _jsx(PlayButton, {
            onClick: startVideo,
            isHovered: isHovered,
            isRed: isRed,
          }),
    ],
  });
}
Youtube.displayName = "YouTube";
addPropertyControls(Youtube, {
  url: { type: ControlType.String, title: "Video" },
  play: {
    type: ControlType.Enum,
    title: "Autoplay",
    options: Object.values(PlayOptions),
  },
  shouldMute: {
    title: "Mute",
    type: ControlType.Boolean,
    enabledTitle: "Yes",
    disabledTitle: "No",
    hidden(props) {
      return props.play === "Off";
    },
  },
  thumbnail: {
    title: "Thumbnail",
    description: "Showing a thumbnail improves performance.",
    type: ControlType.Enum,
    options: Object.values(ThumbnailOptions),
    hidden(props) {
      return props.play !== "Off";
    },
  },
  isRed: {
    title: "Color",
    type: ControlType.Boolean,
    enabledTitle: "Red",
    disabledTitle: "White",
  },
  ...borderRadiusControl,
  ...defaultEvents,
});
const defaultProps = {
  url: "https://youtu.be/smPos0mJvh8",
  play: "Off",
  shouldMute: true,
  thumbnail: "Medium Quality",
  isRed: true,
};
Youtube.defaultProps = defaultProps;
function parseVideoURL(urlString) {
  let url;
  try {
    url = new URL(urlString);
  } catch {
    const embedURL = getEmbedURL(urlString);
    return [urlString, embedURL];
  }
  if (
    url.hostname === "youtube.com" ||
    url.hostname === "www.youtube.com" ||
    url.hostname === "youtube-nocookie.com" ||
    url.hostname === "www.youtube-nocookie.com"
  ) {
    const pathSegments = url.pathname.slice(1).split("/"); // https://www.youtube.com/watch?v=Fop2oskTug8
    if (pathSegments[0] === "watch") {
      const videoId = url.searchParams.get("v");
      const embedURL = getEmbedURL(videoId);
      return [videoId, embedURL];
    } // https://www.youtube.com/embed/Fop2oskTug8
    if (pathSegments[0] === "embed") {
      const videoId = pathSegments[1];
      return [videoId, url];
    }
  } // https://youtu.be/Fop2oskTug8
  if (url.hostname === "youtu.be") {
    const videoId = url.pathname.slice(1);
    const embedURL = getEmbedURL(videoId);
    return [videoId, embedURL];
  }
}
function getEmbedURL(videoId) {
  return new URL(`https://www.youtube.com/embed/${videoId}`);
}
function getThumbnailURL(videoId, res, format = "jpg") {
  // https://gist.github.com/a1ip/be4514c1fd392a8c13b05e082c4da363
  const useWebP = format === "webp";
  const pre = useWebP
    ? "https://i.ytimg.com/vi_webp/"
    : "https://i.ytimg.com/vi/";
  const ext = useWebP ? "webp" : "jpg";
  switch (res) {
    case "Low Quality":
      return `${pre}${videoId}/hqdefault.${ext}`;
    case "Medium Quality":
      return `${pre}${videoId}/sddefault.${ext}`;
    case "High Quality":
      return `${pre}${videoId}/maxresdefault.${ext}`;
    default:
      return `${pre}${videoId}/0.${ext}`;
  }
}
let _getWebPSupported; // https://stackoverflow.com/a/27232658
function getWebPSupported() {
  // We're going to default to webp because it's pretty widely supported by now
  if (!window) {
    return true;
  }
  if (_getWebPSupported !== undefined) {
    return _getWebPSupported;
  }
  const element = document.createElement("canvas");
  if (element.getContext && element.getContext("2d")) {
    // was able or not to get WebP representation
    return (_getWebPSupported =
      element.toDataURL("image/webp").indexOf("data:image/webp") === 0);
  } else {
    // very old browser like IE 8, canvas not supported
    return (_getWebPSupported = false);
  }
} // Helper components
function Instructions() {
  return /*#__PURE__*/ _jsx("div", {
    style: { ...emptyStateStyle, overflow: "hidden" },
    children: /*#__PURE__*/ _jsx("div", {
      style: centerTextStyle,
      children:
        "To embed a Youtube video, add the URL to the properties\xa0panel.",
    }),
  });
}
function ErrorMessage({ message }) {
  return /*#__PURE__*/ _jsx("div", {
    className: "framerInternalUI-errorPlaceholder",
    style: { ...containerStyles, overflow: "hidden" },
    children: /*#__PURE__*/ _jsxs("div", {
      style: centerTextStyle,
      children: ["Error: ", message],
    }),
  });
}
function PlayButton({ onClick, isHovered, isRed }) {
  return /*#__PURE__*/ _jsx("button", {
    onClick: onClick,
    "aria-label": "Play",
    style: buttonStyle,
    children: /*#__PURE__*/ _jsxs("svg", {
      height: "100%",
      version: "1.1",
      viewBox: "0 0 68 48",
      width: "100%",
      children: [
        /*#__PURE__*/ _jsx("path", {
          d: "M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z",
          fill: isHovered ? (isRed ? "#f00" : "#000") : "#212121",
          fillOpacity: isHovered ? (isRed ? 1 : 0.8) : 0.8,
          style: {
            transition:
              "fill .1s cubic-bezier(0.4, 0, 1, 1), fill-opacity .1s cubic-bezier(0.4, 0, 1, 1)",
          },
        }),
        /*#__PURE__*/ _jsx("path", { d: "M 45,24 27,14 27,34", fill: "#fff" }),
      ],
    }),
  });
}
const buttonStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 68,
  height: 48,
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
};
const wrapperStyle = { position: "relative", width: "100%", height: "100%" };
const centerTextStyle = { textAlign: "center", minWidth: 140 };
const videoStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
};
export const __FramerMetadata__ = {
  exports: {
    Youtube: {
      type: "reactComponent",
      name: "Youtube",
      slots: [],
      annotations: {
        framerComponentPresetProps: "isRed, borderRadius",
        framerIntrinsicHeight: "315",
        framerSupportedLayoutWidth: "fixed",
        framerIntrinsicWidth: "560",
        framerContractVersion: "1",
        framerSupportedLayoutHeight: "fixed",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
//# 200907502023 Developers
