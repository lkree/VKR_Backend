import { EventEmitter } from 'events';

export const emitter = new EventEmitter();

export const getCloseEventName = (entityName: string) => `close_${entityName}`;
