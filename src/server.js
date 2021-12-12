import { createServer, Model } from "miragejs";
import { LoggedUser } from "./context/security-context";
import { Response } from "miragejs";

export default function () {
  createServer({
    models: {
      myPokemon: Model,
    },

    seeds(server) {
      server.create("myPokemon", {});
    },

    routes() {
      this.post("/api/users/login", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        if (attrs.username === "ania") {
          return new Response(401, {}, {});
        }
        return { username: attrs.username };
      });

      this.patch("/api/users/:username/pokemons", (schema, request) => {
        let username = request.params.username;
        let attrs = JSON.parse(request.requestBody);
        let myPokemons = schema.myPokemons.findBy({ username });
        if (!myPokemons) {
          myPokemons = { username, pokemonIds: [attrs.pokemonId] };
        } else {
          if (
            myPokemons.attrs.pokemonIds.find((it) => it === attrs.pokemonId)
          ) {
            return new Response(
              422,
              {},
              { message: "Pokemon is already in collection" }
            );
          }

          myPokemons = {
            ...myPokemons.attrs,
            pokemonIds: [...myPokemons.attrs.pokemonIds, attrs.pokemonId],
          };
        }
        return schema.myPokemons.create(myPokemons);
      });

      this.get("/api/users/:username/pokemons", (schema, request) => {
        let username = request.params.username;
        const myPokemons = schema.myPokemons.findBy({ username });
        if (myPokemons) {
          return myPokemons.attrs;
        } else {
          return { username, pokemonIds: [] };
        }
      });

      this.delete("/api/users/:username/pokemons", (schema, request) => {
        const username = request.params.username;
        const attrs = JSON.parse(request.requestBody);
        const myPokemons = schema.myPokemons.findBy({ username });
        if (myPokemons) {
          schema.myPokemons.create({
            ...myPokemons.attrs,
            pokemonIds: myPokemons.attrs.pokemonIds.filter(
              (it) => it !== attrs.pokemonId.toString()
            ),
          });
        }
        return new Response(200);
      });

      this.passthrough("https://pokeapi.co/**");
    },
  });
}
