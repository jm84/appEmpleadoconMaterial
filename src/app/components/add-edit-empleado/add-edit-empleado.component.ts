import { Component } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

interface EstadoCivil {
  value: string;
}
@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class AddEditEmpleadoComponent {
  estadosCiviles: EstadoCivil[] = [
    {
      value: 'Soltero',
    },
    {
      value: 'Casado',
    },
    {
      value: 'Divorsiado',
    },
  ];
}
