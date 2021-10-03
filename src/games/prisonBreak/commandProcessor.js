import React from "react";
import includes from "lodash/includes";
import first from "lodash/first";
import find from "lodash/find";
import filter from "lodash/filter";
import intersection from "lodash/intersection";
import isNil from "lodash/isNil";
import tail from "lodash/tail";
import isEmpty from "lodash/isEmpty";
import "./commandLine.css";
import CommandRef from "./CommandRef";
import { convertToDirection, flipDirection } from "./Location";
import { createWorld, itemsAtLocation, monstersAtLocation } from "./World";
import { equipmentTypes } from "./Item";
import { getPlayerLocation, getPlayer, getPlayerScore } from "./Player";
import { randomInteger } from "../gameEngine";

const commandList = [
  { keys: ["look", "l", "where", "ls"], action: look },
  { keys: ["north", "n", "up"], action: move },
  { keys: ["east", "e", "right"], action: move },
  { keys: ["west", "w", "left"], action: move },
  { keys: ["south", "s", "down"], action: move },
  { keys: ["move", "go"], action: moveBy },
  { keys: ["clear"], action: clear },
  { keys: ["help", "?"], action: help },
  {
    keys: ["quest", "log", "journal", "goal", "objective", "load"],
    action: quest
  },
  { keys: ["save", "backup"], action: save },
  { keys: ["restart", "reset", "delete"], action: restart },
  { keys: ["yes", "ok", "agree", "nod"], action: yes },
  { keys: ["no", "nope", "disagree"], action: no },
  { keys: ["status", "me", "self", "stats"], action: status },
  { keys: ["inventory"], action: inventory },
  { keys: ["equipment"], action: equipment },
  { keys: ["take", "grab", "get", "pickup", "collect"], action: take },
  { keys: ["list"], adverb: true },
  { keys: ["equip", "wear", "don"], action: equip },
  { keys: ["unequip", "remove", "doff"], action: unequip },
  { keys: ["open", "unlock"], action: unlock },
  { keys: ["showmap"], action: revealMap, hidden: true },
  {
    keys: ["attack", "kill", "damage", "hurt", "stab", "kick", "slice", "chop"],
    action: attack
  },
  { keys: ["use", "drink", "consume", "eat"], action: use }
  // drop //item discard
  // quit //game //exit
];

export function processCommand(state, command, allowedCommands) {
  const commandWords = command.split(" ");
  const firstWord = first(commandWords);
  if (!isAllowedCommand(firstWord, allowedCommands)) {
    return invalidInput(state, command);
  }
  const commandDef = find(commandList, (cd) => includes(cd.keys, firstWord));
  if (!commandDef) {
    return error(state, command);
  }
  if (commandDef.adverb) {
    const rest = tail(commandWords).join(" ");
    return processCommand(state, rest);
  }
  return commandDef.action(state, command);
}

export function logViewProcessor(logItem) {
  return logItem;
}

export function updateLog(state, command, value) {
  return {
    ...state,
    currentInput: "",
    log: state.log.concat([command]).concat([value]),
    history: state.history.concat([command]),
    historyPosition: state.history.length + 1
  };
}

export function updateLogDirect(state, value) {
  return {
    ...state,
    log: state.log.concat([value])
  };
}

export function clear(state) {
  return {
    ...state,
    currentInput: "",
    log: []
  };
}

export function error(state, command) {
  return updateLog(
    state,
    command,
    <span>
      Sorry I do not understand {command}. Try entering{" "}
      <CommandRef command="help" /> or <CommandRef command="?" /> to see a list
      of commands.
    </span>
  );
}

export function look(state, command) {
  const playerLocation = getPlayerLocation(state);
  if (!playerLocation) {
    return updateLog(state, command, <span>You are located no where</span>);
  }
  return updateLog(
    state,
    command,
    <span>
      You are located at <b>{playerLocation.name}</b>.{" "}
      {playerLocation.description} <br />
      Looking around you see:
      <br />
      {possibleDirections(state, playerLocation)}
      {itemLook(state, playerLocation)}
      {monsterLook(state, playerLocation)}
    </span>
  );
}

function itemLook(state, location) {
  const items = itemsAtLocation(state, location);
  if (items.length === 0) {
    return null;
  }
  return (
    <span>
      You can see the following item{items.length === 1 ? "" : "s"}:
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <CommandRef command={`take ${item.name}`} label={item.name} />
          </li>
        ))}
      </ul>
    </span>
  );
}

function monsterLook(state, location) {
  const monsters = monstersAtLocation(state, location);
  if (monsters.length === 0) {
    return null;
  }
  return (
    <span>
      You can see the following enemies:
      <ul>
        {monsters.map((monster) => (
          <li key={monster.id}>
            <CommandRef
              command={`attack ${monster.name}`}
              label={monster.name}
            />
          </li>
        ))}
      </ul>
    </span>
  );
}

function possibleDirections(state, location) {
  if (location.paths.length === 0) {
    return null;
  }
  return (
    <span>
      You can move in the following direction
      {location.paths.length === 1 ? "" : "s"}:
      <ul>
        {location.paths.map((path) => {
          if (!path) {
            return null;
          }
          const newLocation = find(state.world.locations, {
            id: path.toLocationId
          });
          return (
            <li key={path.direction}>
              <CommandRef command={path.direction} /> to {newLocation.name}
            </li>
          );
        })}
      </ul>
    </span>
  );
}

export function help(state, command) {
  const commandKeys = commandList
    .filter((cl) => cl.hidden !== true)
    .map((commandDef) => first(commandDef.keys));
  return updateLog(
    state,
    command,
    <span>
      To play this game you enter your actions by typing in the command such as
      <CommandRef command="north" /> to move north or{" "}
      <CommandRef command="look" /> to look around.
      <br />
      Here is the list of valid commands:
      <br />
      <ul>
        {commandKeys.sort().map((key) => {
          return (
            <li key={key}>
              <CommandRef command={key} />
            </li>
          );
        })}
      </ul>
    </span>
  );
}

export function newline(state) {
  return updateLogDirect(state, <br />);
}

export function intro(state) {
  return updateLogDirect(
    state,
    <span>
      You wake up in your cell as you have done for the past few weeks, but
      today something is different. Your cell door is open! This is your one
      chance to escape this prison. I need to move{" "}
      <CommandRef command="south" /> and get out of this cell.
    </span>
  );
}

export function move(state, command) {
  const direction = convertToDirection(command);
  if (!direction) {
    return updateLog(
      state,
      command,
      <span>You cannot move in that direction</span>
    );
  }
  const playerLocation = getPlayerLocation(state);
  const player = getPlayer(state);
  if (!player || !playerLocation || !playerLocation.paths) {
    return updateLog(
      state,
      command,
      <span>
        You cannot move <CommandRef command={direction} />, there is no path
        that way.
      </span>
    );
  }
  const path = playerLocation.paths.find((p) => p.direction === direction);
  if (!path) {
    return updateLog(
      state,
      command,
      <span>
        You cannot move <CommandRef command={direction} />, there is no path
        that way.
      </span>
    );
  }

  if (path.locked) {
    return updateLog(
      state,
      command,
      <span>
        The door in that direction is locked. I will need a key to{" "}
        <CommandRef command="unlock" /> it.
      </span>
    );
  }

  const monsters = monstersAtLocation(state, playerLocation);
  if (monsters.length > 0) {
    return updateLog(
      state,
      command,
      <span>
        {first(monsters).name} blocks our path. I will have to{" "}
        <CommandRef command={`attack ${first(monsters).name}`} label="attack" />{" "}
        and defeat it first.
      </span>
    );
  }

  let updatedState = updateEntity(
    state,
    player.id,
    "locationId",
    path.toLocationId
  );
  const oldLocation = find(state.world.locations, { id: path.fromLocationId });
  const newLocation = find(state.world.locations, { id: path.toLocationId });
  updatedState = updateLocation(updatedState, newLocation.id, "visited", true);
  updatedState = updateLog(
    updatedState,
    command,
    <span>
      You moved from <b>{oldLocation.name}</b> into <b>{newLocation.name}</b>.
      <br />
    </span>
  );

  return look(updatedState, "look");
}

export function moveBy(state, command) {
  const directionParts = command.split(" ");
  if (directionParts.length === 2) {
    const direction = directionParts[1];
    return move(state, direction);
  } else {
    return updateLog(
      state,
      command,
      <span>What direction should I move in?</span>
    );
  }
}

export function quest(state, command) {
  if (state.world.quest === "main") {
    return updateLog(
      state,
      command,
      <span>
        I need to <CommandRef command="look" /> around for an escape.
      </span>
    );
  }

  if (state.world.quest === "done") {
    return updateLog(state, command, <span>I am free at last.</span>);
  }

  const updatedState = {
    ...state,
    world: {
      ...state.world,
      quest: "main"
    }
  };
  return updateLog(
    updatedState,
    command,
    <span>
      You wake up in your cell as you have done for the past few weeks, but
      today something is different. Your cell door is open! This is your one
      chance to escape this prison. I need to move{" "}
      <CommandRef command="south" /> and get out of this cell.
    </span>
  );
}

function save(state, command) {
  return updateLog(
    state,
    command,
    <span>
      This game auto saves all progress. If you would like to start from the
      beginning use the <CommandRef command="restart" /> command.
    </span>
  );
}

function restart(state, command) {
  const updateState = {
    ...state,
    prompt: {
      onYes: resetWorld,
      onNo: (someState) => {
        const otherUpdateState = {
          ...someState,
          prompt: null
        };
        return updateLog(
          otherUpdateState,
          command,
          <span>You continue on.</span>
        );
      }
    }
  };
  return updateLog(
    updateState,
    command,
    <span>
      Are you sure you want to <CommandRef command="restart" /> from the
      beginning? All saved progress up to this point will be lost. (
      <CommandRef command="yes" /> / <CommandRef command="no" />)
    </span>
  );
}

function resetWorld(state, command) {
  const updateState = {
    ...state,
    prompt: null,
    world: createWorld()
  };
  return updateLog(
    updateState,
    command,
    <span>
      Save cleared. You can now <CommandRef command="load" />.
    </span>
  );
}

function yes(state, command) {
  if (state.prompt) {
    return state.prompt.onYes(state, command);
  } else {
    return updateLog(state, command, <span>Yes to what?</span>);
  }
}

function no(state, command) {
  if (state.prompt) {
    return state.prompt.onNo(state, command);
  } else {
    return updateLog(state, command, <span>No to what?</span>);
  }
}

function invalidInput(state, command) {
  return updateLog(
    state,
    command,
    <span>
      You must answer either <CommandRef command="yes" /> or{" "}
      <CommandRef command="no" />
    </span>
  );
}

function isAllowedCommand(command, allowedCommands) {
  if (!allowedCommands) {
    return true;
  }
  const commandWords = command.split(" ");
  const firstWord = first(commandWords);
  const allowedCommandList = filter(
    commandList,
    (commandDef) => intersection(commandDef.keys, allowedCommands).length > 0
  );
  return !isNil(
    find(allowedCommandList, (commandDef) =>
      includes(commandDef.keys, firstWord)
    )
  );
}

function status(state, command) {
  const player = getPlayer(state);
  if (!player) {
    return updateLog(state, command, <span>I am nothing</span>);
  }
  const stats = [
    { name: "HP", value: `${player.currentHP} / ${player.maxHP}` },
    { name: "Strength", value: player.strength },
    { name: "Resistance", value: player.resistance },
    { name: "Speed", value: player.speed },
    { name: "Attack", value: player.attack },
    { name: "Defence", value: player.defence }
  ];
  return updateLog(
    state,
    command,
    <span>
      My current status is:
      <br />
      {stats.map((stat) => (
        <span key={stat.name}>
          {stat.name}: {` ${stat.value}`}
          <br />
        </span>
      ))}
      {playerInventory(state)}
      {playerEquipment(state)}
    </span>
  );
}

function inventory(state, command) {
  const player = getPlayer(state);
  if (!player) {
    return updateLog(state, command, <span>I am nothing</span>);
  }
  return updateLog(state, command, <span>{playerInventory(state)}</span>);
}

function equipment(state, command) {
  const player = getPlayer(state);
  if (!player) {
    return updateLog(state, command, <span>I am nothing</span>);
  }
  return updateLog(state, command, <span>{playerEquipment(state)}</span>);
}

function playerInventory(state) {
  const playerItems = getPlayerItems(state);

  if (playerItems.length < 1) {
    return null;
  }

  return (
    <p>
      {"I'm"} currently carrying: <br />
      {playerItems.map(itemText)}
    </p>
  );
}

function itemText(item) {
  return (
    <span key={item.id}>
      {itemName(item)} - {item.description}
      <br />
    </span>
  );
}

function itemName(item) {
  const isEquipment = includes(equipmentTypes, item.type);
  if (isEquipment) {
    return <CommandRef command={`equip ${item.name}`} label={item.name} />;
  } else {
    return item.name;
  }
}

function playerEquipment(state) {
  const items = getPlayerEquipment(state);

  if (items.length < 1) {
    return null;
  }
  return (
    <p>
      {"I'm"} currently holding: <br />
      {items.map((item) => {
        return (
          <span key={item.id}>
            {item.name} - {item.description}
            <br />
          </span>
        );
      })}
    </p>
  );
}

function take(state, command) {
  const commandTail = tail(command.split(" ")).join(" ");
  const location = getPlayerLocation(state);
  const items = itemsAtLocation(state, location);
  const foundItem = find(
    items,
    (item) => item.name.toLowerCase() === commandTail.trim().toLowerCase()
  );
  const player = getPlayer(state);
  if (!foundItem || !player) {
    return updateLog(
      state,
      command,
      <span>Cannot find anything called {commandTail}</span>
    );
  }
  let updateState = updateEntity(state, foundItem.id, "locationId", null);
  updateState = updateEntity(
    updateState,
    player.id,
    "itemIds",
    player.itemIds.concat(foundItem.id)
  );

  updateState = updateLog(
    updateState,
    command,
    <span>You have taken {foundItem.name}</span>
  );

  if (includes(equipmentTypes, foundItem.type)) {
    return equip(updateState, `equip ${foundItem.name}`);
  }

  return updateState;
}

export function updateEntity(state, id, field, value) {
  const entity = find(state.world.entities, { id });
  if (!entity) {
    return state;
  }
  const updatedEntity = {
    ...entity,
    [field]: value
  };
  return updateEntityForState(state, updatedEntity);
}

export function updateLocation(state, id, field, value) {
  const location = find(state.world.locations, { id });
  if (!location) {
    return state;
  }
  const updateLoc = {
    ...location,
    [field]: value
  };
  return updateLocationForState(state, updateLoc);
}

export function updateLocationForState(state, location) {
  return {
    ...state,
    world: {
      ...state.world,
      locations: state.world.locations
        .filter((e) => e.id !== location.id)
        .concat(location)
    }
  };
}

export function updateEntityForState(state, entity) {
  return {
    ...state,
    world: {
      ...state.world,
      entities: state.world.entities
        .filter((e) => e.id !== entity.id)
        .concat(entity)
    }
  };
}

function equip(state, command) {
  const commandTail = tail(command.split(" ")).join(" ");
  const playerItems = getPlayerItems(state);
  const player = getPlayer(state);
  const foundItem = find(
    playerItems,
    (item) => item.name.toLowerCase() === commandTail.trim().toLowerCase()
  );

  if (!foundItem || !player) {
    return updateLog(
      state,
      command,
      <span>
        You cannot equip {commandTail} as it is not in your inventory.
      </span>
    );
  }
  if (!includes(equipmentTypes, foundItem.type)) {
    return updateLog(
      state,
      command,
      <span>{commandTail} cannot be equipped.</span>
    );
  }

  let updateState = state;
  if (foundItem.type === "weapon") {
    updateState = updateEntity(
      updateState,
      player.id,
      "weaponId",
      foundItem.id
    );
    updateState = updateEntity(
      updateState,
      player.id,
      "attack",
      player.attack + foundItem.attackChange
    );
  }

  if (foundItem.type === "shield") {
    updateState = updateEntity(
      updateState,
      player.id,
      "shieldId",
      foundItem.id
    );
    updateState = updateEntity(
      updateState,
      player.id,
      "defence",
      player.defence + foundItem.defenceChange
    );
  }

  updateState = updateEntity(
    updateState,
    player.id,
    "itemIds",
    player.itemIds.filter((itemId) => itemId !== foundItem.id)
  );

  return updateLog(
    updateState,
    command,
    <span>You have equipped {foundItem.name}</span>
  );
}

function unequip(state, command) {
  const commandTail = tail(command.split(" ")).join(" ");
  const pe = getPlayerEquipment(state);
  const player = getPlayer(state);
  const foundItem = find(
    pe,
    (item) => item.name.toLowerCase() === commandTail.trim().toLowerCase()
  );

  if (!foundItem || !player) {
    return updateLog(
      state,
      command,
      <span>You cannot un-equip {commandTail} as it is not equipped.</span>
    );
  }

  let updateState = state;
  if (foundItem.type === "weapon") {
    updateState = updateEntity(updateState, player.id, "weaponId", null);
    updateState = updateEntity(
      updateState,
      player.id,
      "attack",
      player.attack - foundItem.attackChange
    );
  }

  if (foundItem.type === "shield") {
    updateState = updateEntity(updateState, player.id, "shieldId", null);
    updateState = updateEntity(
      updateState,
      player.id,
      "defence",
      player.defence - foundItem.defenceChange
    );
  }

  updateState = updateEntity(
    updateState,
    player.id,
    "itemIds",
    player.itemIds.concat(foundItem.id)
  );

  return updateLog(
    updateState,
    command,
    <span>You have un-equipped {foundItem.name}</span>
  );
}

function getPlayerItems(state) {
  const player = getPlayer(state);
  if (!player) {
    return [];
  }
  return player.itemIds.map((itemId) =>
    find(state.world.entities, { id: itemId })
  );
}

function getPlayerEquipment(state) {
  const player = getPlayer(state);
  if (!player) {
    return [];
  }
  const e = [];

  const weapon = find(state.world.entities, { id: player.weaponId });
  const shield = find(state.world.entities, { id: player.shieldId });
  if (weapon) {
    e.push(weapon);
  }

  if (shield) {
    e.push(shield);
  }
  return e;
}

export function unlock(state, command) {
  const currentLocation = getPlayerLocation(state);
  if (!currentLocation) {
    return updateLog(state, command, <span>What door</span>);
  }
  const lockedPaths = currentLocation.paths.filter((p) => p.locked);
  if (lockedPaths === 0) {
    return updateLog(
      state,
      command,
      <span>There are no locked doors here.</span>
    );
  }
  const connectedLocations = lockedPaths.map((p) =>
    find(state.world.locations, { id: p.toLocationId })
  );
  let allowedDirection = "";
  const updatePaths = currentLocation.paths.map((p) => {
    if (!p.locked) {
      return p;
    }
    allowedDirection = flipDirection(p.direction);
    return {
      ...p,
      locked: false
    };
  });
  let updateState = updateLocation(
    state,
    currentLocation.id,
    "paths",
    updatePaths
  );
  connectedLocations.forEach((loc) => {
    const otherPaths = loc.paths.map((poa) => {
      if (!poa.locked || poa.direction !== allowedDirection) {
        return poa;
      }
      return {
        ...poa,
        locked: false
      };
    });
    updateState = updateLocation(updateState, loc.id, "paths", otherPaths);
  });

  return updateLog(
    updateState,
    command,
    <span>You have unlocked all doors.</span>
  );
}

export function revealMap(state, command) {
  let updatedState = state;

  state.world.locations.forEach((location) => {
    updatedState = updateLocation(updatedState, location.id, "visited", true);
  });

  return updateLog(updatedState, command, <span>Map is revealed.</span>);
}

export function attack(state, command) {
  const player = getPlayer(state);
  if (!player) {
    return null;
  }
  const playerLocation = getPlayerLocation(state);
  const monsters = monstersAtLocation(state, playerLocation);
  if (isEmpty(monsters)) {
    return updateLog(
      state,
      command,
      <span>There is nothing you can attack in here.</span>
    );
  }

  const monster = first(monsters);
  return battle(state, command, player, monster);
}

export function battle(state, command, creature1, creature2) {
  // fastest creature goes first
  const fighters = [creature1, creature2].sort(
    (c1, c2) => c2.speed + c2.speed / 4 - (c1.speed + c1.speed / 4)
  );
  const fighter1 = fighters[0];
  const fighter2 = fighters[1];

  let updateState = updateLog(
    state,
    command,
    <span>
      {fighter1.name} attacks {fighter2.name}
    </span>
  );

  // first attack
  updateState = damage(updateState, fighter1, fighter2);
  updateState = updateLogDirect(
    updateState,
    <span>
      {fighter1.name} HP: {fighter1.currentHP}/{fighter1.maxHP} vs.{" "}
      {fighter2.name} HP: {fighter2.currentHP}/{fighter2.maxHP}
    </span>
  );
  // check for win/loss condition
  if (fighter2.currentHP <= 0) {
    return finishBattle(updateState, fighter1, fighter2);
  }

  // counter attack
  updateState = damage(updateState, fighter2, fighter1);
  // check for win/loss condition
  if (fighter1.currentHP <= 0) {
    return finishBattle(updateState, fighter2, fighter1);
  }

  // final status update
  return updateLogDirect(
    updateState,
    <span>
      {fighter1.name} HP: {fighter1.currentHP}/{fighter1.maxHP} vs.{" "}
      {fighter2.name} HP: {fighter2.currentHP}/{fighter2.maxHP}
    </span>
  );
}

export function damage(state, creature1, creature2) {
  const attackBoost = Math.round(creature1.attack * 0.25);
  const att = creature1.attack + attackBoost + randomInteger(0, attackBoost);
  const damageAmount = att - creature2.defence;
  creature2.currentHP -= damageAmount;
  if (creature2.currentHP < 0) {
    creature2.currentHP = 0;
  }
  const updateState = updateEntity(
    state,
    creature2.id,
    "currentHP",
    creature2.currentHP
  );

  return updateLogDirect(
    updateState,
    <span>
      {creature1.name} attacked {creature2.name} for {damageAmount} damage!
    </span>
  );
}

export function finishBattle(state, winner, loser) {
  if (loser.type === "player") {
    const updateStateOther = updateLogDirect(
      state,
      <span>
        You have no health left and die!
        <p style={{ fontSize: "20px" }}>GAME OVER</p>
      </span>
    );
    return resetWorld(updateStateOther, "game over");
  }

  winner.score += loser.maxHP;
  let updateState = updateEntity(state, winner.id, "score", winner.score);
  updateState = updateEntity(updateState, loser.id, "locationId", null);
  const vicHP = Math.min(
    winner.maxHP,
    winner.currentHP + Math.round(winner.maxHP * 0.1)
  );
  updateState = updateEntity(updateState, winner.id, "currentHP", vicHP);
  updateState = updateLogDirect(
    updateState,
    <span>You defeated {loser.name}!</span>
  );

  if (loser.name === "Warden") {
    updateState = updateLogDirect(
      updateState,
      <span>
        <p>
          The Warden lays dying and says with his final words: <br />
          You may have won your freedom from this prison, but you shall meet
          your end in the town beyond... <br />
          With that the Warden breaths his last breath. <br />
          You leap over his body and run up the flight of stairs finally
          escaping this hellish place
        </p>
        <p style={{ fontSize: "20px" }}>
          CONGRATULATIONS <br />
          YOU ESCAPED PRISON !!! Score: {getPlayerScore(state)}
        </p>
      </span>
    );

    return resetWorld(updateState, "game over");
  }

  return updateState;
}

export function use(state, command) {
  const commandTail = tail(command.split(" ")).join(" ");
  const playerItems = getPlayerItems(state);
  const player = getPlayer(state);
  const foundItem = find(
    playerItems,
    (item) => item.name.toLowerCase() === commandTail.trim().toLowerCase()
  );

  if (!foundItem || !player) {
    return updateLog(
      state,
      command,
      <span>You cannot use {commandTail} as it is not in your inventory.</span>
    );
  }
  if (includes(equipmentTypes, foundItem.type)) {
    return equip(state, `equip ${commandTail}`);
  }

  if (foundItem.type !== "consumable") {
    return updateLog(
      state,
      command,
      <span>You do not know how to use {foundItem.name}</span>
    );
  }

  let updateState = updateEntity(state, player.id, "currentHP", player.maxHP);
  updateState = updateEntity(
    updateState,
    player.id,
    "itemIds",
    player.itemIds.filter((itemId) => itemId !== foundItem.id)
  );

  return updateLog(
    updateState,
    command,
    <span>You have used {foundItem.name}</span>
  );
}
