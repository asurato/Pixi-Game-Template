export class RootController {
  private static delegate: Map<string, Function> = new Map()

  public static addLogic(maps: { [key: string]: Function }) {
    Object.entries(maps).forEach(([key, value]) => {
      this.delegate.set(key, value)
    })
  }

  public static removeLogic(maps: { [key: string]: Function }) {
    Object.keys(maps).forEach((key) => {
      this.delegate.delete(key)
    })
  }

  public static call(key: string): Function {
    if (!this.has(key)) {
      console.error(`keyが${key}である関数が見つかりません`)
      return () => console.error(`keyが${key}である関数が不正に実行されました`)
    } else return (this.delegate.get(key) as Function)
  }

  public static has(key: string): boolean {
    return this.delegate.has(key)
  }
}