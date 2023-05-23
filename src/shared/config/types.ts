type CSSProperties = Record<string, string>;

export enum CounterStatuses {
  Started = 'started',
  Paused = 'paused',
  Stopped = 'stopped',
  Initialized = 'initialized',
}

export type Item = {
  id: number;
  src: string;
  videoStyle?: CSSProperties;
};

export type DisabledItem = {
  position: number;
  goalAmount: number;
  raisedAmount: number;
  title: string;
  disabled: {
    status?: boolean;
  } & CSSProperties;
} & Item;

export type Position = {
  top: number;
  left: number;
  reversed?: boolean;
};

export type Counter = {
  id: number;
  isActive: boolean;
  listenDonations: boolean;
  color: 'primary' | 'secondary' | 'tertiary';
  status: CounterStatuses;
  startTime: number;
  style: CSSProperties;
};

export type Trebuna = {
  isActive: boolean;
  src: string;
} & CSSProperties;

export type Config = {
  config: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    code: string;
    accessToken: string;
    refreshToken: string;
    webSocketLink: string;
  };
  counters: Array<Counter>;
  app: {
    items: Array<Item | DisabledItem>;
    positions: Array<Position>;
    firstLayerImage: string;
    secondLayerImage: string;
    disabledImage: string;
    trebuna: Trebuna;
  };
};
