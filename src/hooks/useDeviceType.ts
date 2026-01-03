import { useState, useEffect } from "react";

type DeviceType = "desktop" | "tablet" | "mobile";

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const hasTouchScreen =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      if (width <= 768 || (hasTouchScreen && width <= 1024)) {
        if (width <= 480) {
          setDeviceType("mobile");
        } else {
          setDeviceType("tablet");
        }
      } else {
        setDeviceType("desktop");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return deviceType;
}

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}


