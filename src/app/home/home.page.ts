import { Component,OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],

})
export class HomePage implements OnInit {
  pokemons: any[] = []; 
  offser=0;
  limit = 20;
  loading = false;
  searchTerm = '';
  pokemonEncontrado: any = null;
  noEncontrado = false;

  buscarPokemon() {
    if (!this.searchTerm) return;

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.searchTerm.toLowerCase()}`)
      .subscribe({
        next: (res) => {
          this.pokemonEncontrado = res;
          this.noEncontrado = false;
        },
        error: () => {
          this.pokemonEncontrado = null;
          this.noEncontrado = true;
        }
      });
  }
  constructor(private http:HttpClient) {}
  


  ngOnInit() {
    this.loadPokemons();
  }
  loadPokemons(event?: any) {
    if(this.loading) return;
    this.loading = true;
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offser}`)
    .subscribe((res) => {
      this.pokemons = [...this.pokemons, ...res.results];
      this.offser += this.limit;
      this.loading = false;

      if (event) {
        event.target.complete();
      }

      if(res.next == null&& event){
        event.target.disabled = true;
      }
    });
  }
  getImageUrl(index: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`;
  }
}
