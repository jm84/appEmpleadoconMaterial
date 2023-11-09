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

  agregarEmpleado(empleado: Empleado) {
    this.listEmpleado.unshift(empleado);
  }

  getEmpleado(index: number) {
    return this.listEmpleado[index];
  }

  editEmpleado(empleado: Empleado, idEmpleado: number) {
    this.listEmpleado[idEmpleado].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleado[idEmpleado].Correo = empleado.Correo;
    this.listEmpleado[idEmpleado].FechaIngreso = empleado.FechaIngreso;
    this.listEmpleado[idEmpleado].Telefono = empleado.Telefono;
    this.listEmpleado[idEmpleado].EstadoCivil = empleado.EstadoCivil;
    this.listEmpleado[idEmpleado].Sexo = empleado.Sexo;
  }
}
