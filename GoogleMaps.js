import{jsx as _jsx}from"react/jsx-runtime";import{addPropertyControls,ControlType,motion}from"framer";import{containerStyles,useRadius,borderRadiusControl}from"https://framer.com/m/framer/default-utils.js@^0.45.0";import{useMemo}from"react";const coordinatesRegex=/^((?:\-?|\+?)?\d+(?:\.\d+)?),\s*((?:\-?|\+?)?\d+(?:\.\d+)?)$/;/**
 * GOOGLE MAPS
 *
 * @framerIntrinsicWidth 600
 * @framerIntrinsicHeight 400
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */ export default function GoogleMaps({coordinates,zoom,style,...props}){const borderRadius=useRadius(props);const[latitude1,longitude1]=useMemo(()=>{var ref;const[,latitude,longitude]=(ref=coordinates.match(coordinatesRegex))!==null&&ref!==void 0?ref:[null,"","",];return[latitude,longitude];},[coordinates]);return(/*#__PURE__*/ _jsx(motion.div,{style:{...style,...containerStyles,overflow:"hidden",borderRadius},...props,children:/*#__PURE__*/ _jsx("iframe",{style:{height:"100%",width:"100%",border:0},src:`https://maps.google.com/maps?q=${latitude1},${longitude1}&z=${zoom}&output=embed`})}));};addPropertyControls(GoogleMaps,{coordinates:{type:ControlType.String,title:"Coordinates",placeholder:"52.37588, 4.891295",defaultValue:"52.37588, 4.891295",description:"GPS coordinates can be found directly in [Google Maps](https://maps.google.com)."},zoom:{type:ControlType.Number,step:1,min:0,max:25,title:"Zoom",defaultValue:15},...borderRadiusControl});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"GoogleMaps","slots":[],"annotations":{"framerIntrinsicWidth":"600","framerSupportedLayoutWidth":"fixed","framerIntrinsicHeight":"400","framerContractVersion":"1","framerSupportedLayoutHeight":"fixed"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./GoogleMaps.map