import { Navigate, useLoaderData } from "react-router-dom";
import { ROLE_EDITOR, hasPermission } from "../util/authUtils";
import "../css/controlpanel.css";

export default function ControlPanel() {
  console.log("CONTROL PANEL");
  const user = useLoaderData();
  if (!user || !hasPermission(user.role, ROLE_EDITOR)) {
    return <Navigate to="/" />
  }
  return (
    <>
    <h1>Control Panel</h1>
    <div id="control-panel">
      <a href="/controlpanel/users" className="control-option">
        <img src="/img/person-circle.svg" />
        <span>Users</span>
      </a>
      <a href="/controlpanel/games" className="control-option">
        <img src="/img/controller.svg" />
        <span>Games</span>
      </a>
      <a href="/controlpanel/genres" className="control-option">
        <img src="/img/folder2-open.svg" />
        <span>Genres</span>
      </a>
      <a href="/controlpanel/media" className="control-option">
        <img src="/img/images.svg" />
        <span>Media</span>
      </a>
      <a href="/controlpanel/platforms" className="control-option">
        <img src="/img/joystick.svg" />
        <span>Platforms</span>
      </a>
      <a href="/controlpanel/ratings" className="control-option">
        <img src="/img/file-check.svg" />
        <span>Ratings</span>
      </a>
      <a href="/controlpanel/ratingsystems" className="control-option">
        <img src="/img/globe-americas.svg" />
        <span>Rating Systems</span>
      </a>
      <a href="/controlpanel/server" className="control-option">
        <img src="/img/exclamation-circle-fill.svg" />
        <span>Server</span>
      </a>
    </div>
    </>
  );
}