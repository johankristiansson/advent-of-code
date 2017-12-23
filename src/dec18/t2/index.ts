interface State {
  readonly register: Register;
  readonly pointer: number;
  readonly incomming: Array<Send>;
}

type Register = { [k: string]: number };

interface Send {
  readonly type: "send";
  readonly valueNum: number;
  readonly valueStr: string;
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

interface Receive {
  readonly type: "receive";
  readonly register: string;
  readonly value: number;
}

interface Jump {
  readonly type: "jump";
  readonly register: string;
  readonly value: string;
}

type Command =
  | Send
  | SetRegister
  | Increase
  | Multiply
  | Remainder
  | Receive
  | Jump;

export function go(rawInput: string): number {
  const commands = rawInput.split("\r\n").map(r => parseCommand(r));

  let p0: State = {
    register: { p: 0 },
    pointer: 0,
    incomming: []
  };

  let p1: State = {
    register: { p: 1 },
    pointer: 0,
    incomming: []
  };

  let counter = 0;

  while (true) {
    const cmd0 = commands[p0.pointer];
    const cmd1 = commands[p1.pointer];

    if (
      cmd0.type === "receive" &&
      p0.incomming.length === 0 &&
      cmd1.type === "receive" &&
      p1.incomming.length === 0
    ) {
      break;
    }

    if (!~["send", "receive"].indexOf(cmd0.type)) {
      p0 = reduce(p0, cmd0);
    }

    if (!~["send", "receive"].indexOf(cmd1.type)) {
      p1 = reduce(p1, cmd1);
    }

    if (cmd0.type === "send") {
      p1 = {
        ...p1,
        incomming: p1.incomming.concat({
          ...cmd0,
          valueNum: getValue(cmd0.valueStr, p0.register)
        })
      };

      p0 = reduce(p0, cmd0);
    }

    if (cmd1.type === "send") {
      p0 = {
        ...p0,
        incomming: p0.incomming.concat({
          ...cmd1,
          valueNum: getValue(cmd1.valueStr, p1.register)
        })
      };

      p1 = reduce(p1, cmd1);
      counter++;
    }

    if (cmd0.type === "receive") {
      const inc = p0.incomming.shift();
      if (inc) {
        const q = {
          ...cmd0,
          value: inc.valueNum
        };
        p0 = reduce(p0, q);
      }
    }

    if (cmd1.type === "receive") {
      const inc = p1.incomming.shift();
      if (inc) {
        const q = {
          ...cmd1,
          value: inc.valueNum
        };
        p1 = reduce(p1, q);
      }
    }
  }

  return counter;
}

function parseCommand(command: string): Command {
  const split = command.split(" ");

  switch (split[0]) {
    case "snd":
      return {
        type: "send",
        valueNum: 0,
        valueStr: split[1]
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
        type: "receive",
        register: split[1],
        value: -1
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
    case "send":
      return {
        ...state,
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
    case "receive":
      return {
        ...state,
        register: {
          ...state.register,
          [action.register]: action.value
        },
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
