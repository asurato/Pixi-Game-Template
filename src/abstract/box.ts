import { Logic } from "./logic"
import { Container } from "pixi.js"
import { BoxState } from "../types/boxState"
import { Transition } from "./transition/transition"
import { RootController } from "../rootController"

export abstract class Box<V extends Container = Container, L extends Logic = Logic>{

  public abstract readonly view: V
  public abstract readonly logic: L
  protected state: BoxState = BoxState.Waiting
  protected readonly children: Set<Box> = new Set()
  protected abstract transitionIn: Transition
  protected abstract transitionOut: Transition
  protected abstract handlers: { [key: string]: Function }

  public async initialize(transition: boolean = true) {
    this.state = BoxState.Initializing
    RootController.addLogic(this.handlers)
    // this.awake()
    this.logic.onAwake()
    if (transition) await this.transitionIn.begin()
    this.state = BoxState.Normal
    // this.start()
    this.logic.onStart()
  }

  public async finalize(transition: boolean = true) {
    this.state = BoxState.Finalizing
    // this.quit()
    this.logic.onQuit()
    this.children.forEach(box => box.finalize(false))
    this.children.clear()
    if (transition) await this.transitionOut.begin()
    this.state = BoxState.Destroyed
    RootController.removeLogic(this.handlers)
    // this.destroy()
    this.logic.onDestroyed()
  }

  public update(delta: number) {
    switch (this.state) {
      case BoxState.Initializing:
        this.transitionIn.onUpdate(delta)
        break;
      case BoxState.Normal:
        this.logic.onUpdate(delta)
        this.children.forEach(box => box.update(delta))
        break;
      case BoxState.Finalizing:
        this.transitionOut.onUpdate(delta)
        break;
    }
  }

  public async addBox(newBox: Box, transiton: boolean = true) {
    this.view.addChild(newBox.view)
    this.children.add(newBox)
    await newBox.initialize(transiton)
  }

  public async removeBox(oldBox: Box, transiton: boolean = true) {
    await oldBox.finalize(transiton)
    this.view.removeChild(oldBox.view)
    this.children.delete(oldBox)
  }

  public async removeAllBoxes(transiton: boolean = true) {
    await Promise.all(Array.from(this.children).map(box => box.finalize(transiton)))
    this.view.removeChildren()
    this.children.clear()
  }
}