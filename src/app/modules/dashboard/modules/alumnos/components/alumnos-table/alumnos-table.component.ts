import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ListadoDeAlumnos {
  nombre: string;
  position: number;
  apellido: string;
  carrera: string;
}

@Component({
  selector: 'app-alumnos-table',
  standalone: false,
  templateUrl: './alumnos-table.component.html',
  styles: ``
})
export class AlumnosTableComponent {
  displayedColumns: string[] = ['position', 'nombre', 'apellido', 'carrera', 'acciones'];

  @Input ()
  dataSource: ListadoDeAlumnos[] = [];

  @Output()
  deleteAlumno = new EventEmitter<number>();

  @Output()
  editAlumno = new EventEmitter<ListadoDeAlumnos>(); 
}
