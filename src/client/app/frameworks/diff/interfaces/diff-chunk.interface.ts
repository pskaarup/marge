export interface IDiffChunk {
  type:string;
  text:string;
  lineStart?:number;
  lineEnd?:number;
  colStart?:number;
  colEnd?:number;
}
