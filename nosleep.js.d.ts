declare class NoSleep {
  constructor(title: string);

  enable(): Promise<any>;

  disable(): void;

  private _addSourceToVideo(element: HTMLVideoElement, type: string, dataURI: string): void;
}

declare global {
  interface Window {
    NoSleep: typeof NoSleep;
  }
}

export default NoSleep;
