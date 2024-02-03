import { Navigate, useLoaderData } from "react-router-dom";
import { ROLE_MODERATOR, hasPermission } from "../../util/authUtils";

export default function ControlUsers() {
  const user = useLoaderData();
  if (!user || !hasPermission(user.role, ROLE_MODERATOR)) {
    return <Navigate to="/" />
  }

  function searchUsers(e) {
    console.log("kjaskjds");
    e.preventDefault();
  }

  return (
    <>
    <h1>Users</h1>
    <form id="control-users-form" onSubmit={searchUsers}>
      <div className="input-group">
        <label htmlFor="user-username">Username (RegEx)</label>
        <input type="text" id="user-username" name="usernameRegex" />
      </div>
      <div className="input-group">
        <label htmlFor="user-email">Email (RegEx)</label>
        <input type="text" id="user-email" name="emailRegex" />
      </div>
      <div className="input-group">
        <label htmlFor="user-has-email">Has an e-mail address?</label>
        <select id="user-has-email" name="hasEmail">
          <option className="option-any" selected>Either</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="user-role">Role</label>
        <select id="user-role" name="role">
          <option className="option-any" selected>Any Role</option>
          <option value="GUEST">Guest</option>
          <option value="MEMBER">Member</option>
          <option value="EDITOR">Editor</option>
          <option value="MODERATOR">Moderator</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPERUSER">Superuser</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="user-verified">Is e-mail address verified?</label>
        <select id="user-verified" name="verified">
          <option className="option-any" selected>Either</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="user-ban-status">Ban status</label>
        <select id="user-ban-status" name="banStatus">
          <option className="option-any" selected>Any</option>
          <option value="notbanned">Not banned</option>
          <option value="banned">Banned</option>
          <option value="notperma">Not permanently banned</option>
          <option value="perma">Permanently banned</option>
        </select>
      </div>
      <div className="input-group-row">
        <div className="input-group">
          <label htmlFor="user-unbanned-after">Unbanned after</label>
          <input type="datetime-local" id="user-unbanned-after" name="unbannedAfter" />
        </div>
        <div className="input-group">
          <label htmlFor="user-unbanned-before">Unbanned before</label>
          <input type="datetime-local" id="user-unbanned-before" name="unbannedBefore" />
        </div>
      </div>
      <div className="input-group-row">
        <div className="input-group">
          <label htmlFor="user-modified-after">Modified after</label>
          <input type="datetime-local" id="user-modified-after" name="modifiedAfter" />
        </div>
        <div className="input-group">
          <label htmlFor="user-modified-before">Modified before</label>
          <input type="datetime-local" id="user-modified-before" name="modifiedBefore" />
        </div>
      </div>
      <button type="submit">Search users</button>
    </form>
    </>
  );
}