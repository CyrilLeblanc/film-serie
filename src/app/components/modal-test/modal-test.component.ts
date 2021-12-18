import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss'],
})
export class ModalTestComponent implements OnInit {

  @Input() firstName: string;
  str: string = "";

  constructor(private modalControler: ModalController) { }

  ngOnInit() {}

  dismiss(){
    console.log(this.str);
    this.modalControler.dismiss(this.str);
  }

}
