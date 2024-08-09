import { nanoid } from "nanoid";

export type Item = {
  id: string;
  name: number;
};

export const items = [
  {
    id: "0",
    name: 0,
  },
  {
    id: "1",
    name: 1,
  },
  {
    id: "2",
    name: 2,
  },
  {
    id: "3",
    name: 3,
  },
  {
    id: "4",
    name: 4,
  },
  {
    id: "5",
    name: 5,
  },
  {
    id: "6",
    name: 6,
  },
  {
    id: "7",
    name: 7,
  },
  {
    id: "8",
    name: 8,
  },
  {
    id: "9",
    name: 9,
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
    name: "ყველა",
    children: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  {
    id: nanoid(),
    name: "კენტები",
    children: ["1", "3", "5"],
  },
  {
    id: nanoid(),
    name: "ლუწი",
    children: ["2", "4"],
  },
  {
    id: nanoid(),
    name: "5 ზე დიდი ",
    children: ["6", "7", "8", "9"],
  },
  {
    id: nanoid(),
    name: "4 ზე პატარა",
    children: ["0", "1", "2", "3"],
  },
  {
    id: nanoid(),
    name: "4 სადა 6-ს შორის ",
    children: ["4", "5", "6"],
  },
  {
    id: nanoid(),
    name: "ორნიშნა",
    children: ["10"],
  },
];
