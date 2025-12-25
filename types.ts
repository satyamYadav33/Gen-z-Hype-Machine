export interface GeneratedCaptionsResponse {
  captions: string[];
}

export interface FormData {
  productName: string;
  features: string;
}

export type Tone = 'Sassy' | 'Chill' | 'Extra' | 'Witty';

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}