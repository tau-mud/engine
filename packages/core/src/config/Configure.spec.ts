import { Configure, IConfig } from "./Configure";
import { ServiceFactory } from "../service";
import { get } from "lodash";
import { Plugin } from "../Plugin";
import { ServiceBroker } from "moleculer";

describe("Configure", () => {
  describe("defaults", () => {
    it("should return a valid configuration", () => {
      const config = Configure({
        processName: "test",
      });
      expect(config).toBeDefined();
      expect(config).toHaveProperty("processName");
      expect(config.processName).toBe("test");
      expect(config.ServiceFactory).toEqual(ServiceFactory);
      expect(config.transporter).toEqual("tcp");
      expect(config.namespace).toEqual("test");
      expect(config.nodeID).toEqual("test-" + process.pid);
      expect(get(config, "logger.options.level")).toEqual("trace");
      expect(get(config, "logger.options.colors")).toEqual(true);
      expect(get(config, "logger.options.moduleColors")).toEqual(true);
      expect(get(config, "logger.options.formatter")).toEqual("full");
      expect(get(config, "logger.options.objectPrinter")).toEqual(null);
      expect(get(config, "logger.options.autoPadding")).toEqual(false);
      expect(config.created).toBeDefined();
      expect(config.started).toBeDefined();
      expect(config.stopped).toBeDefined();
    });
  });

  describe("with set environment variables", () => {
    beforeEach(() => {
      process.env.TAU_ENV = "test";
      process.env.TAU_LOG_LEVEL = "info";
      process.env.TAU_TRANSPORTER = "nats";
    });

    afterEach(() => {
      delete process.env.TAU_LOG_LEVEL;
      delete process.env.TAU_TRANSPORTER;
    });

    it("should return a valid configuration", () => {
      const config = Configure({
        processName: "test",
      });

      expect(config.namespace).toEqual("test");
      expect(get(config, "logger.options.level")).toEqual("info");
      expect(config.transporter).toEqual("nats");
    });
  });

  describe("with base configuration", () => {
    it("should return a valid configuration", () => {
      const config = Configure(
        {
          processName: "test",
        },
        {
          transporter: "nats",
        }
      );

      expect(config.namespace).toEqual("test");
      expect(get(config, "logger.options.level")).toEqual("trace");
      expect(config.transporter).toEqual("nats");
    });
  });

  describe("configuration calls created plugins", () => {
    class MockPlugin extends Plugin {
      readonly name = "mock";

      created = jest.fn();
      started = jest.fn();
      stopped = jest.fn();
    }

    let config: IConfig;
    let broker: ServiceBroker;

    beforeEach(() => {
      const mockPlugin = new MockPlugin();
      config = Configure(
        {
          processName: "test",
        },
        {
          // logger: false,
          plugins: [mockPlugin],
        }
      );
      broker = new ServiceBroker(config);
    });

    it("should call created", () => {
      expect(config.plugins[0].created).toHaveBeenCalled();
    });

    it("should call started", async () => {
      await broker.start();
      expect(config.plugins[0].started).toHaveBeenCalled();
      await broker.stop();
    });

    it("should call stopped", async () => {
      await broker.start();
      await broker.stop();
      expect(config.plugins[0].stopped).toHaveBeenCalled();
    });
  });
});
