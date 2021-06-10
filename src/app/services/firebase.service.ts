import { Injectable, Type } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../client';
import { Type_car } from '../type_car';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  clientsDoc: AngularFirestoreDocument<Client>;

  typeCarCollection: AngularFirestoreCollection<Type_car>;
  typeCar: Observable<Type_car[]>;
  typeCarDoc: AngularFirestoreDocument<Type_car>;

  constructor(public afs:AngularFirestore) {
    this.clientsCollection = this.afs.collection("Clients");
    this.typeCarCollection = this.afs.collection("Type_car");

    this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as Client
        data.id = a.payload.doc.id;
        return data;
      });
    }));      

    this.typeCar = this.typeCarCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as Type_car
        data.id = a.payload.doc.id;
        return data;
      });
    }));   
   }

   getClients(){
     return this.clients;
   }

   addClient(client: Client){
     this.clientsCollection.add(client);
   }

   //crud sur type vehicule + espace admin de gestion
   getTypeCar(){
    return this.typeCar;
  }

}
