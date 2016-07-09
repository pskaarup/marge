import {BaseComponent} from '../../frameworks/core/decorators/base.component';
import {LogService} from '../../frameworks/core/services/log.service';

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
