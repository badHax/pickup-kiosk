export class Slot {
  constructor(
    public _id: string,
    public lockerId: string,
    public repairs: number,
    public slotNumber: number,
    public status: string,
    public totalReceived: number,
    public totalShipped: number,
    public type: string
  ) {}
}
