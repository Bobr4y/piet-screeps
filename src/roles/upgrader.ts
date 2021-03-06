export function roleUpgrader(creep: Creep) {
    if (Game.time % 5 == 0) {
        creep.say(`🤑`);
    }

    if (creep.carry.energy === 0) {
        creep.memory.working = true;
    } else if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = false;
    }

    if (creep.memory.working === true) {
        const target = creep.pos.findClosestByPath(FIND_SOURCES);
        if (target) {
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target.pos);
            }
        }
    } else if (creep.memory.working === false) {
        // @ts-ignore
        const target: Structure = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_CONTROLLER
        })[0];

        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target.pos);
            }
        }
    }

}
