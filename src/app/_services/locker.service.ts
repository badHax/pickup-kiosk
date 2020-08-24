import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LockerService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  public connect(): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private getNewWebSocket() {
    return webSocket(`http;//${environment.LOCKER_IP}:${environment.LOCKER_PORT}`);
  }

  /**
   * sends data over tcp
   * @param msg command to send
   */
  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  /**
   * close the web socket
   */
  close() {
    this.socket$.complete();
  }

  /**
   * Check all slot to see if they are empty or closed
   */
  getAllSlotOccupancyStatus() {
    const command = this.makeCommand('EMPTY-FULL');
    this.sendMessage(command);
  }
  /**
   * Gets all the door open/close status for locker/cabinet
   */
  getAllSlotDoorStatus() {
    const command = this.makeCommand('DOOR');
    this.sendMessage(command);
  }
  /**
   * Check if the slot is open or closed
   * @param slotAddr the address of the slot on serial board
   */
  getSlotOpenCloseStatus(slotAddr: string) {
    const command = this.makeCommand('DOOR', slotAddr);
    this.sendMessage(command);
  }

  /**
   * Open a slot
   * @param slotAddr the address of the slot on serial board
   */
  openSlot(slotAddr: string) {
    const command = this.makeCommand('OPEN', slotAddr);
    this.sendMessage(command);
  }

  /**
   * Make 5 byte commad object
   * @param command the name of the command
   * @param slotAddr the address of the slot on serial board
   */
  makeCommand(command: string, slotAddr?: string): Uint8Array {
    //board comms are 5 bytes
    var comm = new Uint8Array(5);

    //byte 1; start code
    comm[0] = +'0x02';

    //byte 2; slot address
    if (slotAddr) {
      comm[1] = +slotAddr;
    } else {
      //fixed address
      comm[1] = +'0xF0';
    }

    //byte 3; comm:get status
    if (command === 'DOOR') comm[2] = +'0x30';
    //byte 3; comm:get status
    if (command === 'EMPTY-FULL') comm[2] = +'0x32';
    //byte 3; comm:get status
    if (command === 'OPEN') comm[2] = +'0x31';

    //byte 4; end code
    comm[3] = +'0x03';

    //byte 4; SUM of first 4 bytes
    comm[4] = comm[0] + comm[1] + comm[2] + comm[3];

    return comm;
  }
}
