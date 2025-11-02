import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { HeaderComponent } from './components/header/header.component';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  pokemonData: any[] = [];
  loading = false;
  error = false;

  constructor(private pokemonService: PokemonService) {
    console.log('App Component - VERSÃO ESTÁTICA');
  }

  ngOnInit() {
    console.log('Carregando dados estáticos...');
    this.loadStaticPokemonData();
    this.createParticles();
  }

  loadStaticPokemonData() {
    // Dados estáticos do Bulbasaur para teste
    this.pokemonData = [{
      pokemon: {
        id: 1,
        name: 'bulbasaur',
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
            }
          }
        },
        types: [
          { type: { name: 'grass' } },
          { type: { name: 'poison' } }
        ],
        stats: [
          { base_stat: 45, stat: { name: 'hp' } },
          { base_stat: 49, stat: { name: 'attack' } },
          { base_stat: 49, stat: { name: 'defense' } },
          { base_stat: 65, stat: { name: 'special-attack' } },
          { base_stat: 65, stat: { name: 'special-defense' } },
          { base_stat: 45, stat: { name: 'speed' } }
        ],
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } }
        ]
      },
      species: {
        flavor_text_entries: [
          {
            flavor_text: 'Uma semente rara foi plantada nas costas ao nascer. A planta brota e cresce com este Pokémon.',
            language: { name: 'pt' }
          }
        ]
      }
    }];
    
    console.log('Dados estáticos carregados:', this.pokemonData);
  }

  loadPokemonFromAPI() {
    this.loading = true;
    this.error = false;
    
    console.log('Carregando Pokémon da API...');
    this.pokemonService.getMultiplePokemon([1, 4, 7]).subscribe({
      next: (data: any) => {
        console.log('Pokémon carregados da API:', data.length);
        this.pokemonData = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar Pokémon da API:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  createParticles() {
    console.log('Criando partículas...');
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
      }
    }
  }
}
