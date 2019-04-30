import { observable } from "mobx";

export default class QuoteModel {
  readonly id: number | string;
  @observable text: string;
  @observable authorName: string;

  constructor({ authorName = QuoteModel.defaultAuthorName, text = "" }) {
    this.id = QuoteModel.generateId();
    this.text = text;
    this.authorName = authorName;
  }

  static defaultAuthorName = "Unnamed";

  static nextId = 1;
  static generateId() {
    return this.nextId++;
  }
}
