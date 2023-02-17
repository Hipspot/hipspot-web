import { FlutterCallback } from '@constants/flutterCallback';

export type Message = { type: keyof typeof FlutterCallback; data: string };
