import { types, mixins } from "@tau-mud/core";
import { Context, Errors, Service } from "moleculer";
import EventEmitter from "events";
import { render } from "ink";

import { WithConnection, WithTheme } from "../screen";

export interface IControllerConnectionData {
  id: string;
  portal: string;
  [key: string]: any;
}

export interface IControllerActionParams {
  id: string;
}

export interface IControllerContext<P> extends Context<P> {
  connection?: IControllerConnectionData;
}

export interface IControllerReceiveActionParams
  extends IControllerSendActionParams {}

export interface IControllerRenderActionParams extends IControllerActionParams {
  props: any;
  content: React.FunctionComponent;
}

export interface IControllerRenderTemplateActionParams
  extends IControllerActionParams {
  template: string;
  props: any;
}

export interface IControllerSendActionParams extends IControllerActionParams {
  data: string;
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

export const Controller: types.ITauServiceSchema = {
  name: "controller",
  mixins: [mixins.Service],
  hooks: {
    before: {
      async "*"(
        this: Service,
        ctx: IControllerContext<IControllerActionParams>
      ) {
        const connection = await ctx.call(`connections.getAllMetadata`, {
          id: ctx.params.id,
        });

        ctx.connection = <IControllerConnectionData>connection;
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

    receive: {
      params: {
        id: "string",
        data: "string",
      },
      async handler(ctx: IControllerContext<IControllerReceiveActionParams>) {
        throw new Errors.MoleculerError(
          "Not implemented",
          501,
          "NOT_IMPLEMENTED"
        );
      },
    },

    stop: {
      params: {
        id: "string",
      },
      handler(ctx) {},
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
      async handler(ctx: IControllerContext<IControllerSendActionParams>) {
        const connection: IControllerConnectionData = <
          IControllerConnectionData
        >ctx.connection;

        return ctx.call(`connections.write`, {
          id: ctx.params.id,
          data: ctx.params.data,
        });
      },
    },

    renderTemplate: {
      params: {
        id: "string",
        template: "string",
        props: {
          type: "object",
          optional: true,
        },
      },
      visibility: "protected",
      async handler(
        ctx: IControllerContext<IControllerRenderTemplateActionParams>
      ) {
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

        return this.actions.render({
          id: ctx.params.id,
          content: template,
          props: ctx.params.props,
        });
      },
    },
    render: {
      params: {
        id: "string",
        content: "any",
        props: {
          type: "object",
          optional: true,
        },
      },
      visibility: "protected",
      async handler(ctx: IControllerContext<IControllerRenderActionParams>) {
        const connection: IControllerConnectionData = <
          IControllerConnectionData
        >ctx.connection;

        const { props, content } = ctx.params;

        const buffer = new InkBuffer(
          connection.screen ? connection.screen.width : 100
        );

        const element = content(props || {});

        if (!element) {
          throw new Errors.MoleculerError(
            "No content returned",
            500,
            "NO_CONTENT"
          );
        }

        const templateWithConnection = WithConnection(
          connection,
          WithTheme(this.getMudSetting("theme"), element)
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
