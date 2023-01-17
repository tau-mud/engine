import { config } from "@tau-mud/core";
import { ServiceBroker } from "moleculer";
import { Portal } from "./Portal";

describe("Portal", () => {
  let broker: ServiceBroker;

  beforeAll(async () => {
    const cfg: config.IConfig = config.Configure({
      processName: "test",
      logger: false,
    });

    broker = new ServiceBroker(cfg);

    await broker.start();
    await broker.createService(Portal);
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
