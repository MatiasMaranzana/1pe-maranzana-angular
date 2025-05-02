import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListadoDeAlumnos } from './components/alumnos-table/alumnos-table.component';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  isEditingPosition: number | null = null;

  alumnosForm: FormGroup;
  alumnos: ListadoDeAlumnos[] = [
    { position: 1, nombre: 'Matias', apellido: 'Maranzana', carrera: 'Cs. Económicas' },
    { position: 2, nombre: 'Nicolas', apellido: 'Mansilla', carrera: 'Abogacía' },
    { position: 3, nombre: 'Diego', apellido: 'Donato', carrera: 'Abogacía' },
    { position: 4, nombre: 'Mariano', apellido: 'Gonzalez', carrera: 'Cs. Económicas' },
    { position: 5, nombre: 'Juan Manuel', apellido: 'Lecrerc', carrera: 'Ingeniería Civil' },
    { position: 6, nombre: 'Mauricio', apellido: 'Rindilizbacher', carrera: 'Abogacía' },
    { position: 7, nombre: 'Pablo', apellido: 'Tumino', carrera: 'Cs. Económicas' },
    { position: 8, nombre: 'Leandro', apellido: 'Cabral', carrera: 'Ingeniería Civil' },
    { position: 9, nombre: 'German', apellido: 'Aznares', carrera: 'Abogacía' },
    { position: 10, nombre: 'Daniel', apellido: 'Alonso', carrera: 'Ingeniería Civil' },
  ];

  constructor(private fb: FormBuilder) {
    this.alumnosForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      carrera: ['']
    })
  }

  onSubmit() {
    if (this.isEditingPosition) {
      this.alumnos = this.alumnos.map((alumno) =>
        alumno.position === this.isEditingPosition
          ? { ...alumno, ...this.alumnosForm.value }
          : alumno
      );
    } else {
      const nuevoAlumno = {
        position: this.alumnos.length ? Math.max(...this.alumnos.map(a => a.position)) + 1 : 1,
        ...this.alumnosForm.value
      };
      this.alumnos = [...this.alumnos, nuevoAlumno];
    }
  
    this.alumnosForm.reset();
    this.isEditingPosition = null;
  }

  onDeleteAlumno(position: number) {
    if (confirm('¿Está seguro que desea eliminar este alumno de la lista?')) {
      this.alumnos = this.alumnos
        .filter(alumno => alumno.position !== position)
        .map((alumno, index) => ({ ...alumno, position: index + 1 }));
    }
  }

  onEditAlumno(alumno: ListadoDeAlumnos) {
    this.isEditingPosition = alumno.position;
    console.log('SE VA A EDITAR EL ALUMNO:', alumno);
    this.alumnosForm.patchValue(alumno);
  }

}



