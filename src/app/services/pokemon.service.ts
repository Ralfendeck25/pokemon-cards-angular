import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`);
  }

  getPokemonSpecies(id: number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.baseUrl}/pokemon-species/${id}`);
  }

  getPokemonWithSpecies(id: number): Observable<{pokemon: Pokemon, species: PokemonSpecies}> {
    return this.getPokemon(id).pipe(
      switchMap(pokemon => 
        this.getPokemonSpecies(id).pipe(
          map(species => ({ pokemon, species }))
        )
      )
    );
  }

  getMultiplePokemon(ids: number[]): Observable<{pokemon: Pokemon, species: PokemonSpecies}[]> {
    const requests = ids.map(id => this.getPokemonWithSpecies(id));
    return forkJoin(requests);
  }
}
