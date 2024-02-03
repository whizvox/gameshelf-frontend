import { Navigate, useLoaderData } from "react-router-dom";
import { ROLE_MODERATOR, hasPermission } from "../../util/authUtils";
import { useState } from "react";

function SearchUsersForm({ searchUsers }) {
  return (
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
          <option value="" className="option-any" selected>Either</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="user-role">Role</label>
        <select id="user-role" name="role">
          <option value="" className="option-any" selected>Any Role</option>
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
          <option value="" className="option-any" selected>Either</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="user-ban-status">Ban status</label>
        <select id="user-ban-status" name="banStatus">
          <option value="" className="option-any" selected>Any</option>
          <option value="notbanned">Not banned</option>
          <option value="banned">Banned</option>
          <option value="tempbanned">Banned (temporarily)</option>
          <option value="permabanned">Banned (permanently)</option>
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
  );
}

function SearchingUsersAlert() {
  return (
    <h2 className="alert-searching">Searching for users...</h2>
  );
}

function NoResultsAlert() {
  return (
    <h2 className="alert-no-results">No users found</h2>
  );
}

function UserResults({ results }) {
  return (
    <>
    <table id="users-search-results">
      <thead>
        <tr>
          <th><input type="checkbox" id="results-checkbox" /></th>
          <th>ID</th>
          <th>Username</th>
          <th>E-mail Address</th>
          <th>Role</th>
          <th>Verified</th>
          <th>Ban Expires</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        {results.items.map(user => (
          <tr key={user.id}>
            <td><input type="checkbox" id={`user-${user.id}`} /></td>
            <td class="table-data-monospaced">{user.id}</td>
            <td>{user.username}</td>
            <td className={!user.email && "table-data-na"}>{user.email ?? "None"}</td>
            <td>{user.role}</td>
            <td>{user.verified ? "Yes" : "No"}</td>
            <td className={!user.banExpires && "na-table-data"}>{user.banExpires ?? "N/A"}</td>
            <td className={!user.lastModified && "na-table-data"}>{user.lastModified ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default function ControlUsers() {
  const user = useLoaderData();
  if (!user || !hasPermission(user.role, ROLE_MODERATOR)) {
    return <Navigate to="/" />
  }

  const [ results, setResults ] = useState(null);
  const [ searching, setSearching ] = useState(false);

  function searchUsers(e) {
    e.preventDefault();
    setSearching(true);
    const data = new URLSearchParams();
    for (const pair of new FormData(e.target)) {
      const key = pair[0];
      const value = pair[1];
      if (value) {
        data.append(key, value);
      }
    }
    fetch(`/api/user?${data.toString()}`, {
      method: "get",
    })
    .then(res => res.json())
    .then(res => {
      setResults(res.data);
      setSearching(false);
    });
  }

  return (
    <>
    <h1>Users</h1>
    <SearchUsersForm searchUsers={searchUsers} />
    <hr />
    {searching ?
        <SearchingUsersAlert /> :
        (!results ?
            null :
            (results.items.length === 0 ?
              <NoResultsAlert /> :
              <UserResults results={results} />
            )
        )
    }
    </>
  );
}