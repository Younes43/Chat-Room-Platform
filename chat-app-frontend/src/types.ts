export interface IMessage {
  _id: string;
  text: string;
  user: string ; 
  upvotes: number;
  downvotes: number;
}