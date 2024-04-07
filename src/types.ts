export type RecordedMedia = {
  uid: string;
  name: string;
  audioBlob: Blob;
  audioBlobURL: string;
  duration: number;
  recordedAt: Date;
};
