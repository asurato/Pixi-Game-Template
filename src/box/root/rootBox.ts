import { Box } from "../../abstract/box";
import { RootLogic } from "./rootLogic";
import { Transition } from "../../abstract/transition/transition";
import { Immediate } from "../../abstract/transition/immediate";
import { Container, Application, Ticker } from "pixi.js";
import { TimeBox } from "../../abstract/timeBox";
import { TitleBox } from "../title/titleBox";

export class RootBox extends Box<Container, RootLogic> {

  public readonly view: Container
  public readonly logic: RootLogic
  protected transitionIn: Transition = new Immediate()
  protected transitionOut: Transition = new Immediate()
  protected handlers: { [key: string]: Function }

  private static _instance: RootBox
  private application: Application
  private current: TimeBox

  constructor() {
    super()

    this.application = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000
    })
    this.view = this.application.stage
    document.body.appendChild(this.application.view)
    this.logic = new RootLogic()
    this.handlers = {
      change_scene: (newBox: TimeBox) => this.changeBox(newBox),
      // open_option: () => this.addBox(new OptionBox())
    }

    this.current = new TitleBox()
    this.addBox(this.current, false)
    Ticker.shared.add((delta: number) => {
      this.update(delta)
    })
  }

  private async changeBox(newBox: TimeBox) {
    await this.removeAllBoxes()
    this.current = newBox
    await this.addBox(newBox)
  }

  public get nowBox(): TimeBox {
    return this.current
  }

  public static get instance(): RootBox {
    if (!this._instance) {
      this._instance = new RootBox()
    }

    return this._instance
  }
}