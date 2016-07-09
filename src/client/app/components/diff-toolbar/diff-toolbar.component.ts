import {BaseComponent} from '../../frameworks/core.framework/decorators/base.component';
import {LogService} from '../../frameworks/core.framework/services/log.service';
@BaseComponent({
  moduleId: module.id,
  selector: 'diff-toolbar',
  templateUrl: 'diff-toolbar.component.html',
  styleUrls: ['diff-toolbar.component.css']
})
export class DiffToolbar {

  constructor(private log:LogService) {
  }

}
