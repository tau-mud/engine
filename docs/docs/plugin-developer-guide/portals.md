---
sidebar_position: 1
---

# Portals
A PortalPlugin is a [Moleculer Service](https://moleculer.services/docs/0.14/services.html) mixin that allows players to
connect to the game. An example of a portal is the [`TelnetPortal`](/docs/api/namespaces/tau_mud_portal.portals#telnetportal)
which provides Telnet connectivity to the game. Portals must implement the 
[`IPortalServiceSchema`](/docs) interface, and must at least mix in the 
[`PortalMixin`](/docs/api/modules/tau_mud_portal#portalmixin) mixin.

## Overriding the Base PortalPlugin Actions
The developer must override the `write`, `getMetadata`, `deleteMetadata`, `getAllMetadata` and `setMetadata` actions, 
implementing their respective logic. It is not necessary to implement the event emitter for the set and delete metadata
actions, as the PortalPlugin will do this for you.

## Implementing Callbacks
The developer must call the `onConnect`, `onDisconnect`, `onTimeout` and `onData` actions when the appropriate events
occur. This will ensure that the game world receives the appropriate events.
