interface PropertyMap {
  [id: number]: string;
}

export class BaseEnum {
  private _map: PropertyMap = {};
  private _list: { id: number; name: string }[] = [];

  protected init(self: BaseEnum) {
    const entries = Object.entries(self).filter(
      ([name]) => !name.startsWith("_")
    );
    this._map = entries.reduce<PropertyMap>((p, [name, id]) => {
      p[id] = this.nameConverter(id, name);
      return p;
    }, {});
    this._list = entries.map(([, id]) => ({ id, name: this.getName(+id) }));
  }

  public getName(id: number) {
    return this._map[id] != null ? this._map[id] : "???";
  }

  protected nameConverter(id: number, name: string) {
    return name;
  }

  public get all() {
    return this._list;
  }
}
