interface State {
  readonly register: Register;
  readonly soundFrequency: number;
  readonly pointer: number;
  readonly recovered: boolean;
}

type Register = { [k: string]: number };

interface Sound {
  readonly type: "sound";
  readonly register: string;
}

interface SetRegister {
  readonly type: "set";
  readonly register: string;
  readonly value: string;
}

interface Increase {
  readonly type: "increase";
  readonly register: string;
  readonly value: string;
}

interface Multiply {
  readonly type: "multiply";
  readonly register: string;
  readonly value: string;
}

interface Remainder {
  readonly type: "remainder";
  readonly register: string;
  readonly value: string;
}

interface Recover {
  readonly type: "recover";
  readonly register: string;
}

interface Jump {
  readonly type: "jump";
  readonly register: string;
  readonly value: string;
}

type Command =
  | Sound
  | SetRegister
  | Increase
  | Multiply
  | Remainder
  | Recover
  | Jump;

export function go(rawInput: string): number {
  const commands = rawInput.split("\r\n").map(r => parseCommand(r));

  let state: State = {
    register: {},
    soundFrequency: 0,
    pointer: 0,
    recovered: false
  };

  while (state.pointer < commands.length) {
    state = reduce(state, commands[state.pointer]);
    if (state.recovered) {
      return state.soundFrequency;
    }
  }

  return state.soundFrequency;
}

function parseCommand(command: string): Command {
  const split = command.split(" ");

  switch (split[0]) {
    case "snd":
      return {
        type: "sound",
        register: split[1]
      };
    case "set":
      return {
        type: "set",
        register: split[1],
        value: split[2]
      };
    case "add":
      return {
        type: "increase",
        register: split[1],
        value: split[2]
      };
    case "mul":
      return {
        type: "multiply",
        register: split[1],
        value: split[2]
      };
    case "mod":
      return {
        type: "remainder",
        register: split[1],
        value: split[2]
      };
    case "rcv":
      return {
        type: "recover",
        register: split[1]
      };
    case "jgz":
      return {
        type: "jump",
        register: split[1],
        value: split[2]
      };

    default:
      throw new Error("Unknown command: " + split[1]);
  }
}

function reduce(state: State, action: Command): State {
  switch (action.type) {
    case "sound":
      return {
        ...state,
        soundFrequency: state.register[action.register] || 0,
        pointer: state.pointer + 1
      };
    case "set":
      return {
        ...state,
        register: {
          ...state.register,
          [action.register]: getValue(action.value, state.register)
        },
        pointer: state.pointer + 1
      };
    case "increase":
      return {
        ...state,
        register: {
          ...state.register,
          [action.register]:
            (state.register[action.register] || 0) +
            getValue(action.value, state.register)
        },
        pointer: state.pointer + 1
      };
    case "multiply":
      return {
        ...state,
        register: {
          ...state.register,
          [action.register]:
            (state.register[action.register] || 0) *
            getValue(action.value, state.register)
        },
        pointer: state.pointer + 1
      };
    case "remainder":
      return {
        ...state,
        register: {
          ...state.register,
          [action.register]:
            (state.register[action.register] || 0) %
            getValue(action.value, state.register)
        },
        pointer: state.pointer + 1
      };
    case "recover":
      const frequency = state.register[action.register] || 0;
      return frequency
        ? {
            ...state,
            register: {
              ...state.register,
              [action.register]: frequency
            },
            pointer: state.pointer + 1,
            recovered: true
          }
        : {
            ...state,
            pointer: state.pointer + 1
          };
    case "jump":
      const jump = getValue(action.register, state.register) > 0;
      return jump
        ? {
            ...state,
            pointer:
              state.pointer + (getValue(action.value, state.register) || 1)
          }
        : {
            ...state,
            pointer: state.pointer + 1
          };
  }
}

function getValue(str: string, register: Register): number {
  const number = parseInt(str);
  if (!Number.isNaN(number)) {
    return number;
  }
  return register[str] || 0;
}
