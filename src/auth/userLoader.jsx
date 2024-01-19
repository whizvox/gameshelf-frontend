import { useCookies } from "react-cookie";

export default function userLoader() {
  const [ cookies, setCookie, removeCookie ] = useCookies(["JSESSIONID"]);
  if (!cookies["JSESSIONID"]) {
    console.log("USERLOADER : No session cookie");
    return null;
  }
  return fetch("/api/user/self")
    .then(res => res.json())
    .then(res => {
      if (!res.data) {
        console.log("USERLOADER : no data");
        removeCookie("JSESSIONID");
        return null;
      } else {
        console.log("USERLOADER : data yes");
        return res.data;
      }
    });
}