import {IDiffChunk} from './diff-chunk.interface';
export interface IThreeWayMergeResult {
  base: any[];
  local: {chunks:IDiffChunk[]};
  remote:{chunks:IDiffChunk[]};
  result:{
    text:any,
    highlights?:any[],
    statusText:string
  };
}
