import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';

import { JsonService } from '../services/json/json.service';
import {
  AlertController,
  IonInfiniteScroll,
  LoadingController,
  ModalController,
} from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  type: string = '';
  filter: string = '';
  products: Product[] = [];
  noPage: number = 1;
  error = { status: false, message: '' };
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jsonService: JsonService,
    private loadingControler: LoadingController
  ) {
    this.route.params.subscribe((params) => {
      this.type = params.type;
      this.filter = params.filter;
    });
  }

  ngOnInit() {
    this.loadingControler.create().then((res) => {
      res.present();
      this.loadData();
    });
  }

  loadData() {
    this.jsonService
      .getProducts(this.type, this.filter, this.noPage)
      .subscribe((data) => {
        console.log(data);
        if (data.Response === 'True') {
          data.Search.forEach((p) => {
            if (p.Poster === 'N/A') {
              p.Poster = 'https://via.placeholder.com/300?text=No+Preview';
            }
            this.products.push({
              title: p.Title,
              year: p.Year,
              imdbID: p.imdbID,
              poster: p.Poster,
            });
          });
        } else {
          this.error = { status: true, message: data.Error };
          console.log(this.error);
        }
        this.loadingControler.dismiss();
      });
    this.noPage++;
  }

  scrollMore(event) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
      if (this.products.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  clickItem(imdbID) {
    this.router.navigate(['/info', { imdbID: imdbID }]);
  }
}
