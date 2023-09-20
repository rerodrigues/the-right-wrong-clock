export enum ClockTypes {
  DIGITAL,
  ANALOG,
}

export interface ClockProps {
  ownTime: number;
  isEnabled: boolean;
}
