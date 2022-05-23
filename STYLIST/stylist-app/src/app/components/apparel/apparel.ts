export class FileImage {
  public type: string;
  public name: string;
  public data: Uint8Array;
}

export class BasicColour {
  public name: string;
  public hexCode: string;
}

export class Apparel {
  public id: number;
  public type: string;
  public colour: BasicColour;
  public mainColour: BasicColour;
  public image: FileImage;
  public imageUrl: any;
  public bottom: boolean;
  public onePiece: boolean;
}
