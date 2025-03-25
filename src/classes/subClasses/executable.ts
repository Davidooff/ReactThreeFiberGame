export interface ExecutableMethods {
  [name: string]: Function
}

export default class Executable {
  playerCode: string = "";
  playerFunction: Function | null = null;
  methods: ExecutableMethods | undefined;
  isItMaze: boolean;

  constructor (isItMaze: boolean) {
    this.isItMaze = isItMaze;
  }

  setMethods (methods: string[]) {
    this.methods = methods.reduce((acc, el) => {
      acc[el] = (this as any)[el].bind(this);
      return acc;
    }, {} as { [name: string]: Function });

    this._createUserFunction(this.methods)
    this.methods["isItMaze"] = () => this.isItMaze;
  }

  private _createUserFunction(methods: ExecutableMethods): Function {
    return new Function(
      ...Object.keys(methods),
      this.playerCode
    );
  }

  private _runFunctionWithClassMethods(methods: ExecutableMethods) {
    if (this.playerFunction)
      this.playerFunction(
        ...Object.values(methods)
      );
    else throw new Error("Player function not deffined");
  }

  execute(code: string) {
    if (this.methods === undefined)
      throw new Error("Methods not defined");

    if (code != this.playerCode) {
      this.playerCode = code;
      this.playerFunction = this._createUserFunction(this.methods);
    }
    // eval(this.playerCode);
    this._runFunctionWithClassMethods(this.methods);
  }
}