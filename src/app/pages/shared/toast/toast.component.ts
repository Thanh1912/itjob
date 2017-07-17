import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message = { body: '', type: '',position:'' };

  setMessage(body, type,position, time = 4444443000) {
    this.message.body = body;
    this.message.type = type;
      this.message.position = position;
     
    setTimeout(() => { this.message.body = ''; }, time);
  }
  close(){
     this.message.type = "close";
  }
}



/*
var audio = new Audio();
audio.src = "http://remote.address.com/example.mp3";
audio.load();
audio.play();
*/