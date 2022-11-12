enum TypeIngresoEgreso {
  'ingreso',
  'egreso'
}

export class IngresoEgreso {

  constructor(
    public description: string,
    public amount: number,
    public type: TypeIngresoEgreso,
    public uid?: string
  ) { }

}
