namespace States {

  class State<S> {

    public parent?: State<any>
    public current?: State<S[keyof S]>

    constructor(
      protected children: {[K in keyof S]: State<S[K]>},
      start?: keyof S
    ) {
      if (start) this.current = children[start]
    }

    public enter() { }
    public update() { }
    public exit() { }

    public changeState(key: string) {
      this.parent?.changeChildState(key)
    }

    public changeChildState<K extends keyof S>(key: K) {
      if (this.children[key] === this.current) return;

      const childArr = []
      let tmpNode: State<any> | undefined = this.current
      while(tmpNode) {
        childArr.push(tmpNode)
        tmpNode = tmpNode.current
      }
      for (const node of childArr) {
        node.exit()
      }

      this.current = this.children[key]
      this.current?.enter()
    }
  }

  interface RootState{
    title: TitleState
    battle: BattleState
  }

  interface TitleState{
  }

  interface BattleState{
  }

  class Root extends State<RootState> {
    constructor() {
      super({
        title: new Title(),
        battle: new Battle()
      }, "title")
    }
  }

  class Title extends State<TitleState> {
    constructor() {
      super({})
    }
  }

  class Battle extends State<BattleState> {
    constructor() {
      super({})
    }
  }
}