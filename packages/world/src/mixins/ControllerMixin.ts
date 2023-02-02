import { ITauServiceSchema, ServiceMixin } from "@tau-mud/core";
import { Context, Errors, Service } from "moleculer";
import EventEmitter from "events";
import { render } from "ink";
import { WithConnection } from "../screen/WithConnection";
import { WithTheme } from "../screen/WithTheme";

export interface IControllerConnectionContext {
  id: string;
  portal: string;
  [key: string]: any;
}

export interface IActionParams {
  id: string;
}

export interface ISendActionParams extends IActionParams {
  data: string;
}

export interface IRenderActionParams extends IActionParams {
  template: string;
  props: any;
}

export interface IControllerContext<P> extends Context<P> {
  connection?: IControllerConnectionContext;
}

class InkBuffer extends EventEmitter {
  readonly columns: number;
  private content: string;

  constructor(columns: number) {
    super();

    this.columns = columns;
    this.content = "";
  }

  write(data: string) {
    this.content = this.content + data;
  }

  out(): string {
    return this.content;
  }
}
export const ControllerMixin: ITauServiceSchema = {
  name: "controller",
  mixins: [ServiceMixin],
  hooks: {
    before: {
      async "*"(this: Service, ctx: IControllerContext<IActionParams>) {
        const connection = await ctx.call(`connections.getAllMetadata`, {
          id: ctx.params.id,
        });

        ctx.connection = <IControllerConnectionContext>connection;
      },
    },
  },

  actions: {
    start: {
      params: {
        id: "string",
        connection: "any",
      },
      handler(ctx) {
        throw new Errors.MoleculerError(
          "Not implemented",
          501,
          "NOT_IMPLEMENTED"
        );
      },
      hooks: {
        after(this: Service, ctx) {
          this.broker.logger.debug("Controller started", ctx.params.id);
          this.broker.emit("controller.started", {
            connectionId: ctx.params.id,
            name: this.name,
          });
        },
      },
    },
    stop: {
      params: {
        id: "string",
      },
      handler(ctx) {
        throw new Errors.MoleculerError(
          "Not implemented",
          501,
          "NOT_IMPLEMENTED"
        );
      },
      hooks: {
        after(this: Service, ctx) {
          this.broker.logger.debug("Controller stopped", ctx.params.id);
          this.broker.emit("controller.stopped", {
            connectionId: ctx.params.id,
            name: this.name,
          });
        },
      },
    },

    send: {
      params: {
        id: "string",
        data: "string",
      },
      visibility: "protected",
      async handler(ctx: IControllerContext<ISendActionParams>) {
        const connection: IControllerConnectionContext = <
          IControllerConnectionContext
        >ctx.connection;

        return ctx.call(`connections.write`, {
          id: ctx.params.id,
          data: ctx.params.data,
        });
      },
    },

    render: {
      params: {
        id: "string",
        template: "string",
        props: {
          type: "object",
          optional: true,
        },
      },
      visibility: "protected",
      async handler(ctx: IControllerContext<IRenderActionParams>) {
        const templates = this.originalSchema.templates;

        if (!templates) {
          throw new Errors.MoleculerError(
            "No templates defined",
            500,
            "NO_TEMPLATES"
          );
        }

        const template = templates[ctx.params.template];

        if (!template) {
          throw new Errors.MoleculerError(
            "No template found",
            404,
            "NO_TEMPLATE"
          );
        }

        const connection: IControllerConnectionContext = <
          IControllerConnectionContext
        >ctx.connection;

        const buffer = new InkBuffer(
          connection.screen ? connection.screen.width : 100
        );

        const props = ctx.params.props || {};
        const templateWithConnection = WithConnection(
          connection,
          WithTheme(this.getMudSetting("theme"), template(props))
        );

        const { cleanup } = render(templateWithConnection, {
          // @ts-ignore
          stdout: buffer,
          exitOnCtrlC: false,
          patchConsole: false,
        });

        await cleanup();

        return ctx.call(`${this.name}.send`, {
          id: ctx.params.id,
          data: buffer.out(),
        });
      },
    },
  },
};
