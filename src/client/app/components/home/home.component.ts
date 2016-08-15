import {FormComponent} from '../../frameworks/core/index';
import {DiffWindow} from '../diff-window/diff-window.component';
import {DiffOutput} from '../diff-output/diff-output.component';
import {DiffToolbar} from '../diff-toolbar/diff-toolbar.component';
import {IDiff} from '../../frameworks/diff/interfaces/diff.interface';
import {CORE_DIRECTIVES} from '@angular/common';
import DiffSourceType from '../../frameworks/diff/diff-source-type.enum';
import {Store} from '@ngrx/store';

@FormComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [DiffWindow, DiffOutput, DiffToolbar, CORE_DIRECTIVES]
})
export class HomeComponent {
  diffWindows:IDiff[];
  constructor(private store: Store<any>) {
    this.diffWindows = [
      {
        type: DiffSourceType.BASE,
        path: 'Path to base'
      },
      {
        type: DiffSourceType.LOCAL,
        path: 'Path to yours'
      },
      {
        type: DiffSourceType.REMOTE,
        path: 'Path to theirs'
      }
    ];
  }
}
