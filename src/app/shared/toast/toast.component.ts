import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message = { body: '', type: '' };

  setMessage(body, type, time = 3000) {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => { this.message.body = ''; }, time);
  }
}



/*
var audio = new Audio();
audio.src = "http://remote.address.com/example.mp3";
audio.load();
audio.play();
*/