import { Service, ServiceFactory } from './Service';
import { Action } from './Action';
import {
  ServiceBroker,
  Service as MoleculerService,
  ServiceSchema,
} from 'moleculer';
import { Event } from './Event';

class TestMixin extends Service {
  override name = 'testMixin';
  property: string;

  constructor(broker: ServiceBroker) {
    super(broker);

    this.property = 'testProperty';
  }

  @Action()
  testActionOne() {
    return 'testActionOne';
  }

  @Action({ name: 'testActionTwo', params: { test: 'string' } })
  testAct() {
    return 'testActionTwo';
  }

  @Event()
  testEventOne() {
    return 'testEventOne';
  }

  @Event({ name: 'testEventTwo' })
  testEventTwo() {
    return 'testEventTwo';
  }

  methodOne() {
    return 'methodOne';
  }

  methodTwo() {
    return 'methodTwo';
  }
}

class TestService extends Service {
  override name = 'test';
  override mixins = [{ name: 'test' }, TestMixin];

  @Action()
  testActionThree() {
    return 'testActionThree';
  }
}

describe('Service', () => {
  let broker: ServiceBroker;
  let service: MoleculerService;
  let schema: ServiceSchema;

  beforeEach(() => {
    broker = new ServiceBroker({ logger: false });
    service = new ServiceFactory(broker, TestService);
    schema = service.schema;
  });

  afterEach(() => broker.stop());

  describe('with mixins', () => {
    it('should have mixins correctly defined', () => {
      expect(service.name).toEqual('test');

      const mixins = schema['mixins'] || [];

      expect(mixins[2].created).toBeInstanceOf(Function);
    });

    it('should mixin service schema correctly', () => {
      expect(service.name).toEqual('test');

      const mixins = schema['mixins'] || [];

      expect(mixins[0].name).toEqual('test');
    });

    it('should mixin Service classes correctly', () => {
      expect(service.name).toEqual('test');

      const mixins = service.originalSchema['mixins'] || [];

      expect(mixins[1].name).toEqual('testMixin');
    });
  });

  describe('with actions', () => {
    it('should have actions correctly defined', () => {
      expect(service.name).toEqual('test');

      const actions = schema['actions'] || {};

      expect(Object.keys(actions)).toEqual([
        'testActionOne',
        'testActionTwo',
        'testActionThree',
      ]);
    });
  });

  describe('with events', () => {
    it('should have events correctly defined', () => {
      expect(service.name).toEqual('test');

      const events = schema['events'] || {};

      expect(Object.keys(events)).toEqual(['testEventOne', 'testEventTwo']);
    });
  });

  describe('with methods', () => {
    it('should have methods correctly defined', () => {
      expect(service.name).toEqual('test');

      expect(Object.keys(schema['methodOne'])).toBeDefined();
      expect(Object.keys(schema['methodTwo'])).toBeDefined();
    });
  });
});
