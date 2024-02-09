import GameModel from "../models/GameModel";

export const GAMES: GameModel[] = [
  {
    id: 1,
    groups: [
      {
        id: 1,
        name: "Cores",
        items: [
          {
            id: 1,
            name: "Verde",
          },
          {
            id: 2,
            name: "Preto",
          },
          {
            id: 3,
            name: "Rosa",
          },
          {
            id: 4,
            name: "Azul",
          },
        ],
        color: "#F87526",
      },

      {
        id: 2,
        name: "Insetos",
        items: [
          {
            id: 5,
            name: "Verme",
          },
          {
            id: 6,
            name: "Minhoca",
          },
          {
            id: 7,
            name: "Caracol",
          },
          {
            id: 8,
            name: "Berne",
          },
        ],
        color: "#4E94F3",
      },
    ],
  },
];
