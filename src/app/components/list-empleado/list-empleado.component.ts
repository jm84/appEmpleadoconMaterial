import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

// import { MatTableModule } from '@angular/material/table';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css'],
})
export class ListEmpleadoComponent {
  displayedColumns: string[] = [
    'Nombre',
    'Correo',
    'EstadoCivil',
    'FechaIngreso',
    'Sexo',
    'Telefono',
    'Acciones',
  ];
  dataSource = new MatTableDataSource(this.empleadoService.getEmpleados());
  listaEmpleado: Empleado[] = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor(
    private empleadoService: EmpleadoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarEmpleados();
    this.dataSource.paginator = this.paginator;
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados() {
    this.listaEmpleado = this.empleadoService.getEmpleados();
    console.log(this.listaEmpleado);
    this.dataSource = new MatTableDataSource(this.listaEmpleado);
  }

  eliminarEmpleado(index: number) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: 'Está seguro que desea eliminar el empleado?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Aceptar') {
        console.log(index);
        this.empleadoService.eliminarEmpleado(index);
        this.cargarEmpleados();
      }
    });
  }
}
