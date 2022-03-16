import { Logic } from "../../abstract/logic";
import { TitleDelegate } from "./titleDelegate";

export class TitleLogic extends Logic {
  private view: TitleDelegate

  constructor(view: TitleDelegate) {
    super()
    this.view = view
  }
}