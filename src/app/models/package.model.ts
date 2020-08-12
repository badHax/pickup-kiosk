export class Package {
  constructor(
    public _id:string,
    public label: string,
    public shipmentId: string,
    public size: string,
    public status: string
  ) {}
}
