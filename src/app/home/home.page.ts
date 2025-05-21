import { Component,OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule,IonicModule],
})
export class HomePage implements OnInit {
  pokemons: any[] = []; 
  offser=0;
  limit = 20;
  loading = false;
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
