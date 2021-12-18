import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalTestComponent } from '../components/modal-test/modal-test.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  filter: string = '';

  constructor(
    private router: Router,
    private modalControler: ModalController
  ) {}

  ngOnInit() {}

  updateSearch() {}

  clickFilm() {
    this.navigate('movie');
  }

  clickSerie() {
    this.navigate('series');
  }

  private navigate(t: string) {
    if (this.filter != '') {
      this.router.navigate(['/search', { type: t, filter: this.filter }]);
    }
  }

  async displayModal() {
    const modal = this.modalControler.create({
      component: ModalTestComponent,
      componentProps: {
        firstName: 'bernard',
      },
    });

    (await modal).onDidDismiss().then(data => {
      console.log(data);
    })

    return (await modal).present();
  }
}
