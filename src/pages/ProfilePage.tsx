import React from "react";
import { SecurityContext } from "../context/security-context";
import { fetchMyCollection } from "../api/pokemon-api";

export const ProfilePage = () => {
  const { loggedUser } = React.useContext(SecurityContext);

  const [collectionSize, setCollectionSize] = React.useState<number>(0);

  React.useEffect(() => {
    if (loggedUser) {
      fetchMyCollection(loggedUser).then((collection) =>
        setCollectionSize(collection.ids.length)
      );
    }
  }, [loggedUser]);

  if (!loggedUser) {
    return <></>;
  }

  return (
    <div className="row">
      <h4>{loggedUser.username}</h4>
      <p>Number of pokemons: {collectionSize}</p>
    </div>
  );
};
