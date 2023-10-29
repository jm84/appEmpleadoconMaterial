import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  listEmpleado: Empleado[] = [
    {
      nombreCompleto: 'Juan',
      Correo: 'test@gmail.com',
      Telefono: 43546562,
      Sexo: 'Masculino',
      FechaIngreso: new Date('2023/10/29'),
      EstadoCivil: 'Casado',
    },
    {
      nombreCompleto: 'Pepe',
      Correo: 'ss@gmail.com',
      Telefono: 1111,
      Sexo: 'Femenino',
      FechaIngreso: new Date('2023/10/21'),
      EstadoCivil: 'Soltera',
    },
  ];

  constructor() {}

  getEmpleados() {
    return this.listEmpleado.slice();
  }

  eliminarEmpleado(index: number) {
    this.listEmpleado.splice(index, 1);
  }
}
