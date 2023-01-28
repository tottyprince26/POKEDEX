export interface pokemonInterface {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      other: {
        dream_world: {
          front_default: string;
        }
      }
    };
    types: Array<{
      type: {
        name: string;
      }
    }>;

    url: string;
    abilities: Array<{
      ability: {
        name: string;
        url: string;
      }
    }>;
    height: number;
    weight: number;
    stats: Array<{
      stat: {
        name: string;
        url: string;
      },
      base_stat: number
    }>;
    species: {
      name: string;
      url: string;
      gender_rate: number;
    };

    growth_rate: {
      name: string;
      url: string;
    }

    habitat: {
      name: string;
    };

    generation: {
      name: string;
    };

    egg_groups: Array<{
      name: string;
      url: string;
    }>;
     evolves_from_species: {
      name: string;

     };

     evolution_chain: {
      url: string;
    };
    chain: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: Array<{
        species: {
          name: string;
          url: string;
        };
        evolves_to: Array<{
          species: {
            name: string;
            url: string;
          };
        }>;
      }>;
    };
    
    gender_rate: number;
    count: number;
  next: string;
  previous: string;
  results: any;
  color: {
    name: string;
  };
  characteristics: Array<{
    name: string;
    url: string;
  }>;
  descriptions: Array<{
    description: string;
    url: string;
  }>;
  };

