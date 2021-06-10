import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  styleUrls: ['./rgpd.component.scss']
})
export class RgpdComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RgpdComponent>) {}

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close();
  }

}
