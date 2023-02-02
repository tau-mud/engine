---
sidebar_position: 2
---

# Custom Services
It is possible  to define custom services within a plugin. These are [Moleculer Services](https://moleculer.services/docs/0.14/services.html)
that can either implement the [MoleculerServiceSchema](https://moleculer.services/docs/0.14/services.html#service-schema)
or the [ITauServiceSchema](/docs/api/interfaces/tau_mud_core.itauserviceschema) interface.

## Defining Custom Services
To define a custom service, it is recommended but not necessary to mix in the [Service](/docs/api/modules/tau_mud_core#servicemixin)
mixin. This mixin provides a number of useful methods for interacting with the engine such as the ability to access the
MUD settings. It is also possible to use the `ITauServiceSchema` interface, which is an extension of the
`MoleculerServiceSchema` interface, with the difference that the `settings` property can be either an implementation
of the Moleculer [`ServiceSettingsSchema`](https://moleculer.services/docs/0.14/services.html#service-settings-schema) or
a function to which the MUD settings are passed as a parameter, and which should return an implementation of the 
`ServiceSettingsSchema`, for example:

```typescript
import { Service } from '@tau-mud/core'

export const MyService: ITauServiceSchema = {
  name: 'my-service',
  mixins: [Service],
  settings: (settings) => ({
    // settings is the MUD settings
    // ...
  }),
  actions: {
    // ...
  }
}
```


## Loading Custom Services
To ensure custom sevices are loaded for the appropriate process, the service should be added to the plugins `services`
object, keyed by the process name under which the service should be loaded. For example, to load a service for the
`portal` process:

```typescript
import { MyService } from './my-service';

export const MyPlugin = {
  name: 'my-plugin',
  services: {
    portal: [
      MyService,
    ],
  },
};
```

It is also possible to define services that will be loaded for all processes. To do this, add the service to the `all`
key:

```typescript
import { MyService } from './my-service';

export const MyPlugin = {
  name: 'my-plugin',
  services: {
    all: [
      MyService,
    ],
  },
};
```