import { find, filter } from 'lodash';
import uuid from 'uuid';
import { connectLocations } from './Location';
import { isItem } from './Item';
import { isMonster } from './Creature';

export function createWorld() {
    const locations = setupDefaultLocations();
    const entities = createEntities(locations)
        .concat(createItems(locations))
        .concat(createMonsters(locations));
    return {
        entities,
        locations,
        quest: 'intro'
    };
}

export function createEntities(locations) {
    return [
        {
            id: uuid.v4(),
            name: 'Player',
            description: 'me',
            type: 'player',
            currentHP: 100,
            maxHP: 100,
            strength: 30,
            resistance: 5,
            attack: 30,
            defence: 5,
            speed: 10,
            score: 0,
            locationId: find(locations, { name: 'My Cell' }).id,
            itemIds: []
        }
    ];
}

export function setupDefaultLocations() {
    const jailCell = {
        id: uuid.v4(),
        name: 'My Cell',
        description: 'It is a small room only big enough for you to lie down in with high stone walls.',
        type: 'location',
        paths: [],
        x: 1,
        y: 0,
        visited: true
    };
    const deathRow = {
        id: uuid.v4(),
        name: 'Death Row',
        description: 'A small set of cells where prisoners on death row are kept.',
        paths: [],
        type: 'location',
        x: 1,
        y: 1,
        visited: false
    };
    const deathRowHall = {
        id: uuid.v4(),
        name: 'Death Row Hallway',
        description: 'It is a dark hallway splattered with dry blood.',
        paths: [],
        type: 'location',
        x: 1,
        y: 2,
        visited: false
    };
    const emptyCell = {
        id: uuid.v4(),
        name: 'Empty Cell',
        description: 'A recently vacant cell. The floor is covered with dirt.',
        paths: [],
        type: 'location',
        x: 2,
        y: 1,
        visited: false
    };
    const tunnel = {
        id: uuid.v4(),
        name: 'Tunnel',
        description: 'A small dirt tunnel, with just enough room to crawl through.',
        paths: [],
        type: 'location',
        x: 2,
        y: 2,
        visited: false
    };

    const entryHallway = {
        id: uuid.v4(),
        name: 'Entrance Hallway',
        description: 'A dark and dirty hallway that leads to the jails entrance.',
        paths: [],
        type: 'location',
        x: 1,
        y: 4,
        visited: false
    };

    const jailEntry = {
        id: uuid.v4(),
        name: 'Jail Entry',
        description:
            'The first room of this underground prison and the place where prisoners are processed when they first arrive.',
        paths: [],
        type: 'location',
        x: 1,
        y: 5,
        visited: false
    };
    const medicalWard = {
        id: uuid.v4(),
        name: 'Medical Ward',
        description: 'The medical room of the jail and there should be some healing supplies in here.',
        paths: [],
        type: 'location',
        x: 0,
        y: 3,
        visited: false
    };
    const barracks = {
        id: uuid.v4(),
        name: 'Barracks',
        description: 'Where most of the guards sleep at night.',
        paths: [],
        type: 'location',
        x: 2,
        y: 3,
        visited: false
    };
    const guardStation = {
        id: uuid.v4(),
        name: 'Guard Station',
        description: 'Where guard spend there time watching over the prisoners.',
        paths: [],
        type: 'location',
        x: 1,
        y: 3,
        visited: false
    };

    const armory = {
        id: uuid.v4(),
        name: 'Armory',
        description: 'Where the guards keep most of the weapons and arms.',
        paths: [],
        type: 'location',
        x: 2,
        y: 4,
        visited: false
    };

    connectLocations(jailCell, deathRow, 'south');
    connectLocations(deathRow, emptyCell, 'east');
    connectLocations(deathRow, deathRowHall, 'south');
    connectLocations(deathRowHall, guardStation, 'south');
    connectLocations(guardStation, medicalWard, 'west');
    connectLocations(guardStation, entryHallway, 'south', true);
    connectLocations(guardStation, barracks, 'east', true);
    connectLocations(entryHallway, jailEntry, 'south');
    connectLocations(emptyCell, tunnel, 'south');
    connectLocations(tunnel, barracks, 'south');
    connectLocations(barracks, armory, 'south');

    const locations = [];

    locations.push(jailCell);
    locations.push(deathRow);
    locations.push(deathRowHall);
    locations.push(emptyCell);
    locations.push(tunnel);
    locations.push(entryHallway);
    locations.push(jailEntry);
    locations.push(medicalWard);
    locations.push(barracks);
    locations.push(armory);
    locations.push(guardStation);

    return locations;
}

export function createItems(locations) {
    const sword = {
        id: uuid.v4(),
        name: 'Steel Sword',
        description: 'A good sharp sword made out of steel.',
        type: 'weapon',
        attackChange: 10,
        locationId: find(locations, { name: 'Guard Station' }).id
    };
    const bandage = {
        id: uuid.v4(),
        name: 'Potion',
        description: 'A small potion of healing. Will restore all HP(Health Points) when used.',
        type: 'consumable',
        locationId: find(locations, { name: 'Medical Ward' }).id
    };
    const key = {
        id: uuid.v4(),
        name: 'Entrance Key',
        description: 'A small iron key that has the tag "Entrance Hall" attached to it.',
        type: 'key',
        locationId: find(locations, { name: 'Barracks' }).id
    };

    const roche = {
        id: uuid.v4(),
        name: 'Steel Roche',
        description: 'A small light shield made of polished steel.',
        type: 'shield',
        defenceChange: 5,
        locationId: find(locations, { name: 'Armory' }).id
    };

    return [sword, bandage, key, roche];
}

function createMonsters(locations) {
    return [
        {
            id: uuid.v4(),
            name: 'Guard Dog',
            description: 'A large dog trained to attack prisoners.',
            type: 'monster',
            currentHP: 60,
            maxHP: 60,
            strength: 12,
            resistance: 0,
            attack: 12,
            defence: 0,
            speed: 12,
            score: 0,
            locationId: find(locations, { name: 'Death Row Hallway' }).id
        },
        {
            id: uuid.v4(),
            name: 'Guard Dog',
            description: 'A large dog trained to attack prisoners.',
            type: 'monster',
            currentHP: 60,
            maxHP: 60,
            strength: 12,
            resistance: 0,
            attack: 12,
            defence: 0,
            speed: 12,
            score: 0,
            locationId: find(locations, { name: 'Barracks' }).id
        },
        {
            id: uuid.v4(),
            name: 'Guardsman',
            description: 'An evil guardsman of the Black Prison.',
            type: 'monster',
            currentHP: 80,
            maxHP: 80,
            strength: 12,
            resistance: 5,
            attack: 12,
            defence: 5,
            speed: 7,
            score: 0,
            locationId: find(locations, { name: 'Guard Station' }).id
        },
        {
            id: uuid.v4(),
            name: 'Quartermaster',
            description: 'Large man with big chest.',
            type: 'monster',
            currentHP: 100,
            maxHP: 100,
            strength: 15,
            resistance: 2,
            attack: 15,
            defence: 2,
            speed: 2,
            score: 0,
            locationId: find(locations, { name: 'Armory' }).id
        },
        {
            id: uuid.v4(),
            name: 'Warden',
            description: 'He runs the prison with violence and torture.',
            type: 'monster',
            currentHP: 150,
            maxHP: 150,
            strength: 20,
            resistance: 15,
            attack: 20,
            defence: 15,
            speed: 5,
            score: 0,
            locationId: find(locations, { name: 'Jail Entry' }).id
        }
    ];
}

export function itemsAtLocation(state, location) {
    if (!location) {
        return [];
    }
    const { entities } = state.world;
    return filter(entities, entity => location && entity.locationId === location.id && isItem(entity.type));
}

export function monstersAtLocation(state, location) {
    if (!location) {
        return [];
    }
    const { entities } = state.world;
    return filter(entities, entity => location && entity.locationId === location.id && isMonster(entity.type));
}
