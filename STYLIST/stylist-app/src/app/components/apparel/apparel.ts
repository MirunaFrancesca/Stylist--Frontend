export class FileImage {
  public type: string;
  public name: string;
  public data: Uint8Array;
}

export class Apparel {
  public id: number;
  public type: string;
  public colour: string;
  public image: FileImage;
  public imageUrl: any;
}
