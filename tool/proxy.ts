import { EventEmitter } from "events"
import { keys } from "ts-transformer-keys"

namespace MyProxy {

  type MainTypes<T extends CustomState<T>> = {[P in keyof T]: T[P]["main"]}
  type CustomState<T> = Record<keyof T, CustomType<any, any>>
  type CustomType<T, U> = {item: T, main: U}
  type DataType<S extends object, T extends CustomState<T>> = S & MainTypes<T>

  interface Event4<U, S extends object, T extends CustomState<T>> {
    value: (newer: U, older: U, all: DataType<S, T>) => void
  }
  interface Event5<X, U, S extends object, T extends CustomState<T>> extends Event4<U, S, T> {
    added: (arg: X, all: DataType<S, T>) => void
    removed: (arg: X, all: DataType<S, T>) => void
  }

  interface Emitter1<E extends {[P in keyof object]: Function}> {
    addListener<K extends keyof E>(event: K, listener: E[K]): this
    on<K extends keyof E>(event: K, listener: E[K]): this
    once<K extends keyof E>(event: K, listener: E[K]): this
    removeListener<K extends keyof E>(event: K, listener: E[K]): this
    removeAllListeners<K extends keyof E>(event: K, listener: E[K]): this
    emit<K extends keyof E>(event: K, ...args: any[]): this
  }

  class Model<S extends object, T extends CustomState<T>> {

    public readonly data: DataType<S, T>
    public readonly callbacks: Readonly<{[P in keyof S]: Emitter1<Event4<S[P], S, T>>} & {[P in keyof T]: Emitter1<Event5<T[P]["item"], T[P]["main"], S, T>>}>

    constructor(state: S, custom: MainTypes<T>) {
      const callbacks: any = {}
      for (const key of keys<DataType<S, T>>()) {
        callbacks[key] = new EventEmitter()
      }
      this.callbacks = callbacks

      this.data = new Proxy<DataType<S, T>>({...state, ...custom}, {
        get: (target, prop) => {
          return target[prop as keyof DataType<S, T>]
        },
        set: (target, prop, value) => {
          const older = target[prop as keyof DataType<S, T>]
          if (older === value) return true
          try {
            target[prop as keyof DataType<S, T>] = value
            (this.callbacks[prop as keyof DataType<S, T>] as Emitter1<Event4<DataType<S, T>[keyof DataType<S, T>], S, T>>).emit("value", value, older, this.data)
            return true
          } catch (error) {
            console.log(error)
            return false
          }
        }
      })
    }
  }

  class ExtendedSet<X> extends Set<X> {

    constructor(
      private onChanged: (key: keyof Event5<X, Set<X>, any, any>, value: X) => void
    ) {
      super()
    }

    public add(item: X) {
      this.onChanged("added", item)
      return super.add(item)
    }
    public delete(item: X) {
      this.onChanged("removed", item)
      return super.delete(item)
    }
  }

  interface Status {
    hp: number
    mp: number
    desc: string
  }
  interface MyCustom {
    prop: CustomType<number, ExtendedSet<number>>
  }

  const instance: Model<Status, MyCustom> = new Model<Status, MyCustom>({
    hp: 20,
    mp: 100,
    desc: 'hello'
  }, {
    prop: new ExtendedSet<number>((key, value) => instance.callbacks.prop.emit(key, value, instance.data))
  })
}