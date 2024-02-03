import { Outlet, useLoaderData } from "react-router-dom";

function ProfileIcon({ user }) {
  return (
    <div className="profile-icon">
      <span className="profile-icon-username">{user.username}</span>
      <img className="profile-icon-avatar" src="/profile.png" />
    </div>
  );
}

export default function Root() {
  const user = useLoaderData();
  return (
    <>
      <header>
        <a href="/">
          <h1 className="site-name">Game Shelf</h1>
        </a>
        <nav>
          <a href="/">Home</a>
          <a href="/directory">Directory</a>
          <a href="/trending">Trending</a>
          <a href="/blog">Dev Blog</a>
          <a href="/contact">Contact</a>
        </nav>
        <div>
          {user ?
            <a href={`/profile/${user.username}`}><ProfileIcon user={user} /></a> :
            <a className="header-login-button" href="/login">Login</a>
          }
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
