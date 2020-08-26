import React, { useState } from "react";
import { TableRowInterface } from "./Grid";

const getItem = (key: string) =>
  document.cookie.split("; ").reduce((total, currentCookie) => {
    const item = currentCookie.split("=");
    const storedKey = item[0];
    const storedValue = item[1];
    return key === storedKey ? decodeURIComponent(storedValue) : total;
  }, "");

const setItem = (key: string, value: string, numberOfDays: number) => {
  const now = new Date();
  // set the time to be now + numberOfDays
  now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);
  document.cookie = `${key}=${value};     expires=${now.toUTCString()}; path=/`;
};

export const useCookie = (key: string, defaultValue: any) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie());
  const updateCookie = (value: string, numberOfDays: number) => {
    console.log("inside update Cookied", value);
    setCookie(value);
    setItem(key, value, numberOfDays);
  };
  return [cookie, updateCookie];
};

export const useCookieRows = (_default: TableRowInterface[] = []) => {
  const [cookie, updateCookie] = useCookie("grid", JSON.stringify(_default));
  const updateStoredJSON = (value: TableRowInterface[]) => {
    const stringifiedValue = JSON.stringify(value);
    updateCookie(stringifiedValue);
  };
  return [JSON.parse(cookie), updateStoredJSON];
};
