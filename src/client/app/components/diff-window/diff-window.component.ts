import {LogService} from '../../frameworks/core.framework/services/log.service';
import {BaseComponent} from '../../frameworks/core.framework/decorators/base.component';
import {Input} from '@angular/core';
import {IDiff} from '../../frameworks/diff.framework/diff.interface';
import DiffSourceType from '../../frameworks/diff.framework/diff-source-type.enum';

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
  
  isPurple():boolean {
    return false;
  };
  
  isYellow():boolean {
    
  }
  
  isOrange():boolean {
    
  };

}
