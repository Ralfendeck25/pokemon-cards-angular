import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemonData!: { pokemon: Pokemon, species: PokemonSpecies };
  
  stats: { [key: string]: number } = {};
  description: string = '';
  statNames: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'Ataque',
    'defense': 'Defesa',
    'special-attack': 'At. Especial',
    'special-defense': 'Def. Especial',
    'speed': 'Velocidade'
  };

  ngOnInit() {
    this.calculateStats();
    this.getDescription();
  }

  private calculateStats() {
    this.pokemonData.pokemon.stats.forEach((stat: any) => {
      const statName = stat.stat.name;
      this.stats[statName] = Math.min(100, Math.round((stat.base_stat / 255) * 100));
    });
  }

  private getDescription() {
    this.description = 'Descrição não disponível.';
    const flavorTextEntries = this.pokemonData.species.flavor_text_entries;
    const ptEntry = flavorTextEntries.find((entry: any) => entry.language.name === 'pt');
    if (ptEntry) {
      this.description = ptEntry.flavor_text.replace(/\n/g, ' ');
    }
  }

  getTypeClass(typeName: string): string {
    return typeName.toLowerCase();
  }

  getStatClass(statName: string): string {
    return statName.toLowerCase();
  }

  get statsEntries() {
    return Object.entries(this.stats);
  }
}
