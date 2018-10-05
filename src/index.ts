import { Client, Guild } from 'discord.js';
import { ClusterNodeOptions, ClusterNode, BaseCluster, BaseNode, BaseNodeOptions } from 'lavalink';

export interface ClusterManagerOptions {
	nodes?: ClusterNodeOptions[];
	filter: (node: ClusterNode, guildID: string) => boolean;
}

export class ClusterManager extends BaseCluster {
	public constructor(readonly client: Client, readonly options: ClusterManagerOptions) {
		super(options.nodes);

		client.on('raw', (pk: any) => {
			if (pk.t === 'VOICE_STATE_UPDATE') this.voiceStateUpdate(pk.d);
			if (pk.t === 'VOICE_SERVER_UPDATE') this.voiceServerUpdate(pk.d);
		});

		Object.defineProperty(client, 'lavalink', { value: this });
		Object.defineProperty(Guild.prototype, 'player', {
			get(this: Guild) {
				return (this.client as any).lavalink.players.get(this.id);
			},
		});
	}

	send (guildID: string, packet: any) {
		if (this.client.guilds.has(guildID)) return (this.client as any).ws.send(packet);
		return Promise.resolve();
	}

	filter (node: ClusterNode, guildID: string) {
		return this.options.filter(node, guildID);
	}
}

export class NodeManager extends BaseNode {
	public constructor(readonly client: Client, readonly options: BaseNodeOptions) {
		super(options);

		client.on('raw', (pk: any) => {
			if (pk.t === 'VOICE_STATE_UPDATE') this.voiceStateUpdate(pk.d);
			if (pk.t === 'VOICE_SERVER_UPDATE') this.voiceServerUpdate(pk.d);
		});

		Object.defineProperty(client, 'lavalink', { value: this });
		Object.defineProperty(Guild.prototype, 'player', {
			get(this: Guild) {
				return (this.client as any).lavalink.players.get(this.id);
			},
		});
	}

	send (guildID: string, packet: any) {
		if (this.client.guilds.has(guildID)) return (this.client as any).ws.send(packet);
		return Promise.resolve();
	}
}
