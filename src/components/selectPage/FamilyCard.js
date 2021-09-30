import React from "react";
import yt_logo from "../../assets/logo/yt_logo.svg";
import sf_logo from "../../assets/logo/spotify_logo.png";

function FamilyCard({familyPlatform, familyName}) {
  const getLogo = () => {
    if (familyPlatform.toLowerCase() === "spotify") {
      return sf_logo;
    } else {
      return yt_logo;
    }
  };
  return (
    <div className="h-auto w-44">
      <div className="h-44 w-44 rounded-md p-3">
        <div
          className="h-full w-full img-select"
          style={{backgroundImage: `url("${getLogo()}")`}}
        />
      </div>
      <p className="text-center text-2xl text-white">{familyName}</p>
    </div>
  );
}

export default FamilyCard;
