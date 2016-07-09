import {FormComponent} from '../../frameworks/core/index';
import {NameListService} from '../../frameworks/app/index';
import {DiffWindow} from '../diff-window/diff-window.component';
import {DiffOutput} from '../diff-output/diff-output.component';
import {DiffToolbar} from '../diff-toolbar/diff-toolbar.component';
import {IDiff} from '../../frameworks/diff/diff.interface';
import {CORE_DIRECTIVES} from '@angular/common';
import DiffSourceType from '../../frameworks/diff/diff-source-type.enum';

@FormComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [DiffWindow, DiffOutput, DiffToolbar, CORE_DIRECTIVES]
})
export class HomeComponent {
  diffWindows:IDiff[];
  constructor(public nameListService:NameListService) {
    this.diffWindows = [
      {
        type: DiffSourceType.BASE,
        path: 'Path to base'
      },
      {
        type: DiffSourceType.YOURS,
        path: 'Path to yours'
      },
      {
        type: DiffSourceType.THEIRS,
        path: 'Path to theirs'
      }
    ];
  }
}
