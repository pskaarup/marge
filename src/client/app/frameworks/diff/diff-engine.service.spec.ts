import {t} from '../test/index';

export function main() {
  t.describe('diff-engine', () => {

    t.it('Should do math', () => {
      t.expect(3+5).toBe(8);
    });

  });
}
