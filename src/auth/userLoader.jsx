const TOKEN_ID = "JSESSIONID";

export default function userLoader() {
  return fetch("/api/user/self")
    .then(res => res.json())
    .then(res => res.data);
}