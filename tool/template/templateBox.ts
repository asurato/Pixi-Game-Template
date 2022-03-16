import { Box } from "../../src/abstract/box";
import { Immediate } from "../../src/abstract/transition/immediate";
import { Transition } from "../../src/abstract/transition/transition";
import { TemplateLogic } from "./templateLogic";
import { TemplateView } from "./templateView";

export class TemplateBox extends Box<TemplateView, TemplateLogic> {

  public readonly view: TemplateView
  public readonly logic: TemplateLogic
  protected transitionIn: Transition
  protected transitionOut: Transition
  protected handlers: { [key: string]: Function }

  constructor() {
    super()

    this.view = new TemplateView()
    this.logic = new TemplateLogic(this.view)

    this.transitionIn = new Immediate()
    this.transitionOut = new Immediate()

    this.handlers = {}
  }
}