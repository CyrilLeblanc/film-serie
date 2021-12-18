import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from '../services/json/json.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  imdbID: string = "";
  data = {};
  constructor(private route: ActivatedRoute, private jsonService: JsonService) {
    this.route.params.subscribe(params => {
      this.imdbID = params.imdbID;
    })
  }

  ngOnInit() {
    this.jsonService.getInfo(this.imdbID).subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }

}
