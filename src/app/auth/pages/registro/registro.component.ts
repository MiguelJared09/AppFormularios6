import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validators/validaciones';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  //TODO: Temporal Mover a Validators
  /* nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"; */
  //DONE!!

  //TODO: Mover este método a Validators
  /* noPuedeSerStrider(control: FormControl){
    const valor:string = control.value?.trim().toLowerCase();
    if ( valor === 'strider') {
      //return ERROR!!
      return {
        noStrider: true
      }
    }
    return null;
  } */
  //DONE

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)] ],
    password2: ['', [Validators.required] ]
  }, {
    validators: [ this.validatorService.camposIguales('password','password2') ]
  });


  get emailErrorMsg (): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']){
      return 'El correo es un campo Obligatorio';
    } else if (errors?.['pattern']){
      return 'Formato de correo No válido';
    } else if (errors?.['emailTomado']){
      return 'El correo ya está asociado a otra cuenta';
    }
    return ''
  }

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorsService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Miguel Martinez',
      email: 'test1@test.com',
      username: 'miguel_jared09',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
    && this.miFormulario.get(campo)?.touched;
  }

  /* emailRequired() {
    return this.miFormulario.get('email')?.errors?.['required']
    && this.miFormulario.get('email')?.touched
  }

  emailFormato() {
    return this.miFormulario.get('email')?.errors?.['pattern']
    && this.miFormulario.get('email')?.touched
  }

  emailEnUso() {
    return this.miFormulario.get('email')?.errors?.['emailTomado']
    && this.miFormulario.get('email')?.touched
  } */

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
