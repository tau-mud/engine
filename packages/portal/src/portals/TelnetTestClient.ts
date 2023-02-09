import EventEmitter from "events";
import { Socket } from "net";
import { COMMANDS, OPTIONS } from "moleculer-telnet";

abstract class TelnetOptionHandler {
  abstract match(sequence: Buffer): boolean;
  abstract handle(client: TelnetTestClient, sequence: Buffer): Promise<void>;
}

class DoTTYPEWill extends TelnetOptionHandler {
  match(sequence: Buffer): boolean {
    return sequence[1] === COMMANDS.DO && sequence[2] === OPTIONS.TTYPE;
  }

  async handle(client: TelnetTestClient, sequence: Buffer): Promise<void> {
    return client.sendWill(OPTIONS.TTYPE);
  }
}

class DoTTYPEWont extends TelnetOptionHandler {
  match(sequence: Buffer): boolean {
    return sequence[1] === COMMANDS.DO && sequence[2] === OPTIONS.TTYPE;
  }

  async handle(client: TelnetTestClient, sequence: Buffer): Promise<void> {
    return client.sendWont(OPTIONS.TTYPE);
  }
}

class WillCharsetDo extends TelnetOptionHandler {
  match(sequence: Buffer): boolean {
    return sequence[1] === COMMANDS.WILL && sequence[2] === OPTIONS.CHARSET;
  }

  async handle(client: TelnetTestClient, sequence: Buffer): Promise<void> {
    return client.sendDo(OPTIONS.CHARSET);
  }
}

class WillCharsetDont extends TelnetOptionHandler {
  match(sequence: Buffer): boolean {
    return sequence[1] === COMMANDS.WILL && sequence[2] === OPTIONS.CHARSET;
  }

  async handle(client: TelnetTestClient, sequence: Buffer): Promise<void> {
    return client.sendDont(OPTIONS.CHARSET);
  }
}

/**
 * The TelnetTestClient is a MUD client that is used for testing.
 */
export class TelnetTestClient extends EventEmitter {
  private readonly host: string;
  private readonly port: number;
  private readonly socket: Socket;
  private readonly ttypeEnabled: Boolean = false;
  private readonly charset: String | undefined;
  private readonly handlers: Array<TelnetOptionHandler>;

  /**
   * @param host The host to connect to.
   * @param port The port to connect to.
   * @param options The options to use for the Telnet connection.
   */
  constructor(host: string, port: number, options: any = {}) {
    super();
    this.host = host;
    this.port = port;

    this.handlers = [];

    if (options.ttype) {
      this.handlers.push(new DoTTYPEWill());
    } else {
      this.handlers.push(new DoTTYPEWont());
    }

    if (options.charset) {
      this.handlers.push(new WillCharsetDo());
    } else {
      this.handlers.push(new WillCharsetDont());
    }

    this.ttypeEnabled = options.ttype || false;
    this.charset = options.charset;

    this.socket = new Socket();

    this.socket.on("data", async (data) => {
      if (data[0] === COMMANDS.IAC) {
        for (const handler of this.handlers) {
          if (handler.match(data)) {
            await handler.handle(this, data);
            return;
          }
        }
      } else {
        this.emit("data", data);
      }
    });
  }

  /**
   * Connects to the MUD server.
   */
  async connect(): Promise<void> {
    this.socket.connect(this.port, this.host);

    return new Promise((resolve, reject) => {
      this.socket.on("connect", () => {
        resolve();
      });

      this.socket.on("error", (err) => {
        reject(err);
      });
    });
  }

  /**
   * Disconnects from the MUD server.
   */
  async disconnect(): Promise<void> {
    this.socket.destroy();

    return new Promise((resolve, reject) => {
      this.socket.on("close", () => {
        resolve();
      });

      this.socket.on("error", (err) => {
        reject(err);
      });
    });
  }

  /**
   * Sends a command to the MUD server.
   * @param sequence The command sequence to send.
   */
  async sendTelnetCommand(sequence: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.write(Buffer.from([COMMANDS.IAC, ...sequence]), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Sends a DO command to the MUD server.
   * @param option The option to send.
   */
  async sendDo(option: number): Promise<void> {
    return this.sendTelnetCommand(Buffer.from([COMMANDS.DO, option]));
  }

  /**
   * Sends a DONT command to the MUD server.
   * @param option The option to send.
   */
  async sendDont(option: number): Promise<void> {
    return this.sendTelnetCommand(Buffer.from([COMMANDS.DONT, option]));
  }

  /**
   * Sends a WILL command to the MUD server.
   * @param option The option to send.
   */
  async sendWill(option: number): Promise<void> {
    return this.sendTelnetCommand(Buffer.from([COMMANDS.WILL, option]));
  }

  /**
   * Sends a WONT command to the MUD server.
   * @param option The option to send.
   */
  async sendWont(option: number): Promise<void> {
    return this.sendTelnetCommand(Buffer.from([COMMANDS.WONT, option]));
  }

  /**
   * Write a string to the MUD server.
   * @param str The string to write.
   */
  async write(str: string | Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.write(str, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Writes a line to the MUD server.
   * @param str The string to write.
   */
  async writeLine(str: string | Buffer): Promise<void> {
    if (typeof str === "string") {
      str = Buffer.from(str);
    }

    return this.write(Buffer.concat([str, Buffer.from("\r\n")]));
  }
}
