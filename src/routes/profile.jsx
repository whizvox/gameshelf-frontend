import { useEffect, useState } from "react";
import { Navigate, useLoaderData } from "react-router-dom";

function getMonth(month) {
  switch (month) {
    case 1:
      return "Janurary";
    case 2:
      return "Feburary";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "(invalid)";   
  }
}

function Birthday({ year, month, day }) {
  let birthday = "";
  let monthStr = "";
  if (month) {
    monthStr = getMonth(month);
  }
  if (year) {
    if (month) {
      if (day) {
        birthday = monthStr + " " + day + ", " + year;
      } else {
        birthday = monthStr + " " + year;
      }
    } else {
      birthday = year;
    }
  } else {
    if (month && day) {
      birthday = monthStr + " " + day;
    }
  }
  if (birthday) {
    return <div className="profile-birthday">{birthday}</div>;
  }
  return null;
}

function FavoriteGames({ favoriteGames }) {
  if (!favoriteGames.length) {
    return (
      <div className="profile-favorite-games">
        <h1>No favorite games</h1>
      </div>
    );
  }
  return (
    <div className="profile-favorite-games">
      {favoriteGames.map(game => {
        return (
          <div className="favorite-game-entry">
            <div>
              <img src={"/api/media/" + game.boxArt.id} />
            </div>
            <div>
              <a href={game.isRelease ? "/release/" + game.id : "/game/" + game.id}><h1>{game.title}</h1></a>
              <span class="favorite-game-platform">
                {game.platforms.map(platform => <a href={"/platform/" + platform.shortName}>{platform.shortName}</a>).join(", ")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Profile() {
  const profile = useLoaderData();
  if (!profile) {
    return <Navigate to="/" />
  }
  return (
    <>
    <div id="profile">
      <div className="profile-header">
        <div>
          <img className="profile-avatar" src={profile.avatarUrl} />
          <Birthday year={profile.birthdayYear} month={profile.birthdayMonth} day={profile.birthdayDay} />
        </div>
        <div>
          <h1 className="profile-username">{profile.username}</h1>
          {profile.biography && <p className="profile-biography">{profile.biography}</p>}
        </div>
      </div>
      <div className="profile-games">
        <FavoriteGames favoriteGames={profile.favoriteGames} />
        <div className="profile-stats">
          <div className="average-rating">Average Rating: {profile.averageRating}</div>
          <div className="total-games">Total Games Played: {profile.totalGames}</div>
          <div className="total-games-playing">Playing: {profile.totalGamesPlaying}</div>
          <div className="total-games-finished">Finished: {profile.totalGamesFinished}</div>
          <div className="total-games-stopped">Stopped: {profile.totalGamesStopped}</div>
          <div className="total-games-onhold">On-Hold: {profile.totalGamesOnHold}</div>
          <div className="total-games-dropped">Dropped: {profile.totalGamesDropped}</div>
          <div className="total-games-planned">Planned: {profile.totalGamesPlanned}</div>
        </div>
      </div>
    </div>
    </>
  );
}