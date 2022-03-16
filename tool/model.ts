import { Box } from "../src/abstract/box";

class Model<State = {}, PArray extends {[X in keyof PArray]: Array<any>} = {}> {

  private _onChanged: Partial<Record<keyof State, (newer: any, older: any, values: State & PArray) => void>> = {}
  private _onAdded: Partial<Record<keyof PArray, (newer: any, values: State & PArray) => void>> = {}
  private _onRemoved: Partial<Record<keyof PArray, (newer: any, values: State & PArray) => void>> = {}

  constructor(
    private _box: Box,
    private _values: State & PArray
  ) {

  }

  public onChanged<K extends keyof State>(key: K, listener: (newer: State[K], older?: State[K], values?: State & PArray) => void) {
    this._onChanged[key] = listener
    return this
  }

  public onAdded<K extends keyof PArray>(key: K, listener: (newer: PArray[K][0], values?: State & PArray) => void) {
    this._onAdded[key] = listener
    return this
  }

  public onRemoved<K extends keyof PArray>(key: K, listener: (older: PArray[K][0], values?: State & PArray) => void) {
    this._onRemoved[key] = listener
    return this
  }

  public setState<K extends keyof State>(key: K, value: State[K]) {
    const older: State[K] = this._values[key]
    this._values = {...this._values, key: value}
    if (this._onChanged[key] && older !== value) (this._onChanged[key] as (a: any, b?: any, c?: State & PArray) => void)(value, older, this._values)
  }

  public add<K extends keyof PArray>(key: K, element: PArray[K][0]) {
    this._values[key].push(element)
    if (this._onAdded[key]) (this._onAdded[key] as (newer: PArray[K][0], values: State & PArray) => void)(element, this._values)
  }

  public remove<K extends keyof PArray>(key: K, element: PArray[K][0]) {
    this._values = {...this._values, key: this._values[key].filter(v => v !== element)}
    if (this._onRemoved[key]) (this._onRemoved[key] as (older: PArray[K][0], values: State & PArray) => void)(element, this._values)
  }

  public get<K extends keyof (State & PArray)>(key: K): (State & PArray)[K] {
    return this._values[key]
  }

  public get values(): State & PArray {
    return this._values
  }
}
