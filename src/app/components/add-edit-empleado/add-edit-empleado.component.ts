import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  idEmpleado: any;
  accion = 'Crear';
  myForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private route: Router,
    private snackBar: MatSnackBar,
    private aRoute: ActivatedRoute
  ) {
    this.myForm = this.formbuilder.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    });
    this.idEmpleado = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.editarEmpleado();
    }
  }

  guardarEmpleado() {
    console.log(this.myForm);
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto')?.value,
      Correo: this.myForm.get('correo')?.value,
      FechaIngreso: this.myForm.get('fechaIngreso')?.value,
      Telefono: this.myForm.get('telefono')?.value,
      EstadoCivil: this.myForm.get('estadoCivil')?.value,
      Sexo: this.myForm.get('sexo')?.value,
    };

    if (this.idEmpleado !== undefined) {
      this.editEmpleado(empleado);
    } else {
      this.agregarEmpleado(empleado);
    }
  }

  agregarEmpleado(empleado: Empleado) {
    this.empleadoService.agregarEmpleado(empleado);
    this.snackBar.open('Agreado con éxito!', '', {
      duration: 3000,
    });
    this.route.navigate(['/']);
  }

  editEmpleado(empleado: Empleado) {
    this.empleadoService.editEmpleado(empleado, this.idEmpleado);
    this.snackBar.open('Empleado actualizado con éxito!', '', {
      duration: 3000,
    });
    this.route.navigate(['/']);
  }

  editarEmpleado() {
    const empleado: Empleado = this.empleadoService.getEmpleado(
      this.idEmpleado
    );
    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      correo: empleado.Correo,
      fechaIngreso: empleado.FechaIngreso,
      telefono: empleado.Telefono,
      estadoCivil: empleado.EstadoCivil,
      sexo: empleado.Sexo,
    });
  }
}
