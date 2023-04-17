import { NamedAPIResourceListWithId } from "@/types";

export const regions: NamedAPIResourceListWithId = {
  count: 10,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: "kanto",
      url: "https://pokeapi.co/api/v2/region/1/",
    },
    {
      id: 2,
      name: "johto",
      url: "https://pokeapi.co/api/v2/region/2/",
    },
    {
      id: 3,
      name: "hoenn",
      url: "https://pokeapi.co/api/v2/region/3/",
    },
    {
      id: 4,
      name: "sinnoh",
      url: "https://pokeapi.co/api/v2/region/4/",
    },
    {
      id: 5,
      name: "unova",
      url: "https://pokeapi.co/api/v2/region/5/",
    },
    {
      id: 6,
      name: "kalos",
      url: "https://pokeapi.co/api/v2/region/6/",
    },
    {
      id: 7,
      name: "alola",
      url: "https://pokeapi.co/api/v2/region/7/",
    },
    {
      id: 8,
      name: "galar",
      url: "https://pokeapi.co/api/v2/region/8/",
    },
    {
      id: 9,
      name: "hisui",
      url: "https://pokeapi.co/api/v2/region/9/",
    },
    {
      id: 10,
      name: "paldea",
      url: "https://pokeapi.co/api/v2/region/10/",
    },
  ],
};
