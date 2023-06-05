export interface User {
  id: number;
  name: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface Discover {
  id: number;
  name: string;
}
export const categories: Category[] = [
  { id: 1, name: "Art" },
  { id: 2, name: "Collection" },
  { id: 3, name: "Music" },
  { id: 4, name: "Music" },
  { id: 5, name: "Music" },
  { id: 6, name: "Music" },
  { id: 7, name: "Music" },
  { id: 8, name: "Music" },
];

export const users: User[] = [
  { id: 1, name: "Tolga" },
  { id: 2, name: "Tolga1" },
  { id: 3, name: "Tolga2" },
  { id: 4, name: "Tolga3" },
  { id: 5, name: "Tolga4" },
  { id: 6, name: "Tolga5" },
  { id: 7, name: "Tolga6" },
  { id: 8, name: "Tolga7" },
  { id: 9, name: "Tolga8" },
  { id: 10, name: "Tolga9" },
];

export const discover: Discover[] = [
  { id: 1, name: "Discover" },
  { id: 2, name: "Discover1" },
  { id: 3, name: "Discover2" },
  { id: 4, name: "Discover3" },
];
