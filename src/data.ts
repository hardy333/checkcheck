import { nanoid } from "nanoid";

export type Item = {
  id: string;
  name: number;
};

export const items = [
  {
    id: nanoid(),
    name: 22,
  },
  {
    id: nanoid(),
    name: 233,
  },
  {
    id: nanoid(),
    name: 2452,
  },
  {
    id: nanoid(),
    name: 522,
  },
  {
    id: nanoid(),
    name: 52,
  },
  {
    id: nanoid(),
    name: 33,
  },
  {
    id: nanoid(),
    name: 100,
  },
  {
    id: nanoid(),
    name: 200,
  },
  {
    id: nanoid(),
    name: 300,
  },
  {
    id: nanoid(),
    name: 500,
  },
];

export type Group = {
  id: string;
  name: string;
  children: string[];
};

export const groups: Group[] = [
  {
    id: nanoid(),
    name: "g1",
    children: [items[0].id, items[1].id, items[2].id, items[3].id, items[4].id],
  },
  {
    id: nanoid(),
    name: "g2",
    children: [items[0].id, items[1].id, items[8].id],
  },
  {
    id: nanoid(),
    name: "g3",
    children: [items[5].id, items[6].id, items[7].id],
  },
  {
    id: nanoid(),
    name: "g4",
    children: [items[2].id, items[3].id, items[4].id],
  },
  {
    id: nanoid(),
    name: "g5",
    children: [items[2].id, items[3].id, items[4].id],
  },
  {
    id: nanoid(),
    name: "g6",
    children: [items[2].id, items[3].id, items[4].id, items[9].id, items[8].id],
  },
];
