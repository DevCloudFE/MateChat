export interface Source {
  from: string;
  to: string;
}
export interface Template {
  name: string;
  sources: Source[];
}
