export default interface Review {
  id: number;
  user: {
    id?: number;
    name: string;
    picture: string;
    isSuper?: boolean;
  },
  rating: number;
  feedback: string;
  visitTime: string;
}