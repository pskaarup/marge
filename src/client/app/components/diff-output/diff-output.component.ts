import {BaseComponent} from '../../frameworks/core.framework/decorators/base.component';
import {LogService} from '../../frameworks/core.framework/services/log.service';

@BaseComponent({
  moduleId: module.id,
  selector: 'diff-output',
  templateUrl: 'diff-output.component.html',
  styleUrls: ['diff-output.component.css']
})
export class DiffOutput {

  constructor(private log:LogService) {
  }

}
