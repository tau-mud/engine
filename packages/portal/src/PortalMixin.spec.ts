import { config } from "@tau-mud/core";
import { ServiceBroker } from "moleculer";
import { PortalMixin } from "./PortalMixin";

describe("Portal", () => {
  let broker: ServiceBroker;

  beforeAll(async () => {
    const cfg: config.IConfig = config.Configure({
      processName: "test",
      logger: false,
    });

    broker = new ServiceBroker(cfg);

    await broker.start();
    await broker.createService(PortalMixin);
    await broker.waitForServices("portal");
  });

  describe("send", () => {
    it("should cause a 'Not implemented' error", async () => {
      await expect(
        broker.call("portal.send", {
          id: "test",
          data: "test",
        })
      ).rejects.toThrow("Not implemented");
    });
  });
});
