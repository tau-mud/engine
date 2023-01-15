import { Event } from './Event';
import { Service } from './Service';

describe('@Event', () => {
  it('should apply metadata to the decorated method', () => {
    class TestService extends Service {
      @Event()
      test() {
        return 'test';
      }
    }

    const events = Reflect.getMetadata(
      'moleculer:event',
      TestService.prototype.test
    );
    expect(events).toEqual({});
  });

  it('should apply metadata to the decorated method with options', () => {
    class TestService extends Service {
      @Event({ name: 'test' })
      test() {
        return 'test';
      }
    }

    const events = Reflect.getMetadata(
      'moleculer:event',
      TestService.prototype.test
    );
    expect(events).toEqual({ name: 'test' });
  });

  it('should apply metadata to the decorated method with options as a function', () => {
    class TestService extends Service {
      @Event((schema = { name: 'test' }) => ({ name: schema.name }))
      test() {
        return 'test';
      }
    }

    const events = Reflect.getMetadata(
      'moleculer:event',
      TestService.prototype.test
    );
    expect(events).toBeInstanceOf(Function);
  });
});
