import {
  BrokerOptions,
  Service,
  ServiceBroker,
  ServiceSchema,
} from "moleculer";

import { TelnetPortal } from "./TelnetPortal";
import { ServiceFactory } from "@tau-mud/core/lib/service";

describe("TelnetPortal", () => {
  let broker: ServiceBroker;
  let service: Service;
  describe("settings", () => {
    describe("defaults", () => {
      beforeEach(async () => {
        broker = new ServiceBroker(<BrokerOptions>{
          logger: false,
          ServiceFactory: ServiceFactory,
        });

        await broker.start();

        service = broker.createService(TelnetPortal);
      });

      afterEach(async () => {
        await broker.stop();
      });

      it("should set the default host", () => {
        expect(service.settings.host).toBe("127.0.0.1");
      });

      it("should set the default port", () => {
        expect(service.settings.port).toBe(2323);
      });

      it("should set the default ttype", () => {
        expect(service.settings.ttype).toBe(true);
      });

      it("should set the default charset", () => {
        expect(service.settings.charset).toBe("UTF-8");
      });
    });

    describe("with settings", () => {
      beforeEach(async () => {
        broker = new ServiceBroker(<BrokerOptions>{
          logger: false,
          ServiceFactory: ServiceFactory,
          settings: {
            telnet: {
              host: "127.0.0.2",
              port: 2323,
              ttype: false,
              charset: "UTF-9",
            },
          },
        });

        await broker.start();

        service = broker.createService(TelnetPortal);
      });

      afterEach(async () => {
        await broker.stop();
      });

      it("should set the host", () => {
        expect(service.settings.host).toBe("127.0.0.2");
      });

      it("should set the port", () => {
        expect(service.settings.port).toBe(2323);
      });

      it("should set the ttype", () => {
        expect(service.settings.ttype).toBe(false);
      });

      it("should set the charset", () => {
        expect(service.settings.charset).toBe("UTF-9");
      });
    });
  });
});
