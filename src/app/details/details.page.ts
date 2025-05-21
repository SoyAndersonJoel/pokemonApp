import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Detalle del Pokémon</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>{{ nombre | titlecase }}</h2>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Imagen Pokémon" />
      <p>Este es pikachu.</p>
    </ion-content>
  `
})
export class DetailsPage {
  nombre: string = '';

  constructor(private route: ActivatedRoute) {
    this.nombre = this.route.snapshot.paramMap.get('id') || '';
  }
}
