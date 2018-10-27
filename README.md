# discord.js

[![lavalibs support server](https://discordapp.com/api/guilds/494948120103485440/embed.png)](https://discord.gg/jXSKeW5)

Lavalink Library based on [lavalink.js](https://github.com/lavalibs/lavalink.js) made for [discord.js](https://github.com/discordjs/discord.js).

# Installation

```bash
npm i @lavalink/discord.js
```

# Usage

```js
const { NodeManager } = require('@lavalink/discord.js');
const { Client } = require('discord.js');

const client = new Client();
const node = new NodeManager(client, {
  userID: 'your bot user ID',
  hosts: {
    // see lavalink.js docs
  },
});
```

# Reference

See the [lavalink.js docs](https://github.com/lavalibs/lavalink.js) for details on BaseCluster, BaseNode, and any other options.

## `ClusterManager extends BaseCluster`
- **`constructor(client: Discord.Client, options?: ClusterManagerOptions)`**

```ts
interface ClusterManagerOptions {
	nodes?: ClusterNodeOptions[];
	filter: (node: ClusterNode, guildID: string) => boolean;
}
```

## `NodeManager extends BaseNode`
- **`constructor(client: Discord.Client, options?: BaseNodeOptions)`**
