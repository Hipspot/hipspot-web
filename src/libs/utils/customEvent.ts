import { DOMTargetList } from '@constants/DOM';
import { CustomEventPropsMap } from '@libs/types/customEvents';

export const createCustomEvent: <K extends keyof CustomEventPropsMap>(
  eventName: K,
  detail: CustomEventPropsMap[K]
) => CustomEventPropsMap[K] & Event = (eventName, detail) => Object.assign(new Event(eventName), detail);

export const dispatchCustomEvent: <K extends keyof CustomEventPropsMap>(
  targetName: string,
  event: HTMLElementEventMap[K]
) => void = (eventName, event) => {
  const elem = DOMTargetList[eventName];
  if (!elem) return;
  elem.dispatchEvent(event);
};
