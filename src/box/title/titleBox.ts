import { TimeBox } from "../../abstract/timebox";
import { Immediate } from "../../abstract/transition/immediate";
import { Transition } from "../../abstract/transition/transition";
import { TitleLogic } from "./titleLogic";
import { TitleView } from "./titleView";

export class TitleBox extends TimeBox<TitleView, TitleLogic> {

  public readonly view: TitleView
  public readonly logic: TitleLogic
  protected transitionIn: Transition
  protected transitionOut: Transition
  protected handlers: { [key: string]: Function }

  constructor() {
    super()

    this.view = new TitleView()
    this.logic = new TitleLogic(this.view)

    this.transitionIn = new Immediate()
    this.transitionOut = new Immediate()

    this.handlers = {}
  }
}