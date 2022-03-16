import { Logic } from "../../src/abstract/logic";
import { TemplateDelegate } from "./templateDelegate";

export class TemplateLogic extends Logic {
  private view: TemplateDelegate

  constructor(view: TemplateDelegate) {
    super()
    this.view = view
  }
}