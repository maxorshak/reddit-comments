export interface Comment {
  id: string;
  author: string;
  text: string;
  vote: true | false | null;
  timestamp: number;
  replies?: Comment[];
}
