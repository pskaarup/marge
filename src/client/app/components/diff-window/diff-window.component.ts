import {BaseComponent} from '../../frameworks/core/decorators/base.component';
import {Input} from '@angular/core';
import {IDiff} from '../../frameworks/diff/diff.interface';
import DiffSourceType from '../../frameworks/diff/diff-source-type.enum';
import {LogService} from '../../frameworks/core/services/log.service';

@BaseComponent({
  moduleId: module.id,
  selector: 'diff-window',
  templateUrl: 'diff-window.component.html',
  styleUrls: ['diff-window.component.css']
})
export class DiffWindow {

  @Input() source:IDiff;

  constructor(private log:LogService) {
  }

  windowReference():string {
    switch (this.source.type) {
      case DiffSourceType.BASE:
        return 'A';
      case DiffSourceType.YOURS:
        return 'B';
      default:
        // DiffSourceType.THEIRS:
        return 'C';
    }
  }
}
