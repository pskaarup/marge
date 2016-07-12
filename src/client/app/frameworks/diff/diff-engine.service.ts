import {Injectable} from '@angular/core';
import {IDiffChunk} from './interfaces/diff-chunk.interface';
import {IThreeWayMergeResult} from './interfaces/three-way-merge-result.interface';
let DiffMatchPatch = require('googlediff');

@Injectable()
export class DiffEngine {
  private _diff_match_patch:any;

  private static typeOfChunk(typeInt:number):string {
    switch (typeInt) {
      case 1:
        return 'add';
      case -1:
        return 'delete';
      default:
        return 'nop';
    }
  }

  private static cleanText(typeInt:number, text:string):string {
    if (typeInt === -1) {
      return text.replace(/[^\s]/g, ' ');
    } else {
      return text;
    }
  }

  private static numberOfLinesInChunk(chunk:IDiffChunk) {
    return (chunk.text.match(/\n/g) || []).length;
  }

  constructor() {
    this._diff_match_patch = new DiffMatchPatch();
    this._diff_match_patch.Match_Threshold = 0.1;
  }


  public threeWayMerge(base:string, local:string, remote:string):IThreeWayMergeResult {
    const baseLocalDiff = this.lineLevelDiff(base, local);
    const baseRemoteDiff = this.lineLevelDiff(base, local);
    const [resultText, status] = this.merge(base, local, baseRemoteDiff);
    //const resultDiffs = this.lineLevelDiff(base, resultText);

    return {
      base: this.generateBaseHighlights(base, local, remote),
      local: {
        chunks: this.mapDiffsToChunks(baseLocalDiff)
      },
      remote: {
        chunks: this.mapDiffsToChunks(baseRemoteDiff)
      },
      result: {
        text: resultText,
        //highlights: [],
        statusText: `(individual patch status: ${status.join(',')})`
      }
    };
  }


  private lineLevelDiff(file1:string, file2:string):any[] {
    const {chars1, chars2, lineArray} = this._diff_match_patch.diff_linesToChars_(file1, file2);
    const diffs = this._diff_match_patch.diff_main(chars1, chars2, false);
    this._diff_match_patch.diff_charsToLines_(diffs, lineArray);
    this._diff_match_patch.diff_cleanupSemantic(diffs);
    return diffs;
  }

  private merge(base:string, local:string, baseRemoteDiff:any[]):[any, any] {
    const patches = this._diff_match_patch.patch_make(base, baseRemoteDiff);
    let [resultText, status] = this._diff_match_patch.patch_apply(patches, local);

    return [resultText, status];
  }

  private generateBaseHighlights(base:string, local:string, remote:string):any[] {
    return [];
  }

  private mapDiffsToChunks(differences:[number, string][]):IDiffChunk[] {
    let lineCntr = 0;
    let colsSinceLastBreak = 0;
    return _.map(differences, ([typeInt, text]:[number, string]):IDiffChunk => {
      let chunk:IDiffChunk = {
        type: DiffEngine.typeOfChunk(typeInt),
        text: DiffEngine.cleanText(typeInt, text)
      };
      let numChunkLines = DiffEngine.numberOfLinesInChunk(chunk);
      chunk.lineStart = lineCntr;
      chunk.lineEnd = lineCntr + numChunkLines;
      chunk.colStart = colsSinceLastBreak;
      let lastBreakIndex = chunk.text.lastIndexOf('\n'); // TODO: handle other newline types
      if (lastBreakIndex > -1) {
        colsSinceLastBreak = chunk.text.length - lastBreakIndex - 1;
      } else {
        colsSinceLastBreak += chunk.text.length;
      }

      chunk.colEnd = colsSinceLastBreak;
      lineCntr += numChunkLines;
      return chunk;
    });
  }
}
