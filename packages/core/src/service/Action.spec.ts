import 'reflect-metadata';

import { Action } from './Action';
import { Service } from './Service';

describe('@Action', () => {
  it('should apply the action metadata to the decorated method', () => {
    class TestService extends Service {
      @Action()
      test() {
        return 'test';
      }
    }

    const actions = Reflect.getMetadata(
      'moleculer:action',
      TestService.prototype.test
    );

    expect(actions).toEqual({});
  });

  it('should apply the action metadata to the decorated method with options', () => {
    class TestService extends Service {
      @Action({ name: 'test' })
      test() {
        return 'test';
      }
    }

    const actions = Reflect.getMetadata(
      'moleculer:action',
      TestService.prototype.test
    );

    expect(actions).toEqual({ name: 'test' });
  });
});
