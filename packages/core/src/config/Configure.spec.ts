import { Configure } from "./Configure";
import { ServiceFactory } from "../service";
import { get } from "lodash";

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
});
