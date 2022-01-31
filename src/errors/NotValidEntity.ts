export default class NotValidEntity extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotValidEntityError";
  }
}
