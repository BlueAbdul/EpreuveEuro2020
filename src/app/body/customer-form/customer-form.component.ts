import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/client';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Type_car } from 'src/app/type_car';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WinModalComponent } from '../win-modal/win-modal.component';
import { RgpdComponent } from '../rgpd/rgpd.component';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  clients: Client[];
  type_car: Type_car[];

  clientForm! : FormGroup;
  major = true;
  formMajor = false;
  formVw = false;
  endForm = false;
  
  constructor(private firebaseService:FirebaseService, private router:Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'firstname': new FormControl(null, Validators.required),
      'sexe': new FormControl(null),
      'birthday': new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'phone' : new FormControl(null, Validators.minLength(10)),
      'address': new FormGroup({
        'street': new FormControl(null),
        'zipcode': new FormControl(null),
        'city': new FormControl(null),
        'country': new FormControl(null),
      }),
      'car': new FormGroup({
        'driving_licence': new FormControl(null, Validators.required),
        'personal_car': new FormControl(null, Validators.required),
        'car_is_vw': new FormControl(null, Validators.required),
        'no_vw': new FormControl(null),
        'type_car' : new FormControl(null),
      }),
      'vw' : new FormGroup({
        'know_vw': new FormControl(null, Validators.required),
        'note_vw': new FormControl(null, Validators.required),
      }),
      'accept_offers': new FormControl(null),
      'rgpd': new FormControl(null),
    })
    

    this.clientForm.get('birthday').valueChanges.subscribe((value)=>{
      this.isMajor(value)
    })

    this.clientForm.get('car.driving_licence').valueChanges.subscribe((value)=>{
      this.formVw = !value
    })

    this.clientForm.get('car.personal_car').valueChanges.subscribe((value)=>{
      this.formVw = !value
    })

    this.clientForm.get('car.car_is_vw').valueChanges.subscribe(()=>{
      this.formVw = true
    })

    this.clientForm.get('vw.know_vw').valueChanges.subscribe((value)=>{
      this.endForm = !value
    })

    this.clientForm.get('vw.note_vw').valueChanges.subscribe(()=>{
      this.endForm = true
    })



    this.getAllTypeCar();

  }

  addCustomer(client:Client){
    this.firebaseService.addClient(client);
    this.showEndForm(client);
  }

  onSubmit() {
    if(this.major){
      this.addCustomer(this.clientForm.value);
    }else {
      this.showEndForm(this.clientForm.value);
    }
  }

  isMajor(value){
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    if(today <= value){
      this.major = false
      this.formMajor = false
    }else {
      this.major = true
      this.formMajor = true
    }
  }

  getAllTypeCar(){
    this.firebaseService.getTypeCar().subscribe((type_car)=> {
      this.type_car = type_car;
      this.type_car.sort((a,b) => a.type > b.type ? 1 : -1)
    });
  }

  showEndForm(client:Client){
    const dialogRef = this.dialog.open(WinModalComponent, {
      width: '250px',
      data: {firstname: client.firstname, email:client.email}
  })
}

  showRgpd(){
    const dialogRef = this.dialog.open(RgpdComponent, {
      width: '720px',
  })
  }


}
