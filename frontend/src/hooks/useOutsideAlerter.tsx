// import React, { useRef, useEffect, MutableRefObject, useState } from "react";

// /**
//  * Hook that alerts clicks outside of the passed ref
//  */
// const useOutsideAlerter = (ref: MutableRefObject<any>): boolean => {
//   const [isOutside, setIsOutside] = useState<boolean>(false);

//   useEffect(() => {
//     setIsOutside(false);
//     console.log("test");

//     const handleClickOutside = (event: any) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         setIsOutside(true);
//       }
//     };
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);

//   console.log(isOutside);

//   return isOutside;
// };
// export default useOutsideAlerter;

import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialIsVisible: any) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
