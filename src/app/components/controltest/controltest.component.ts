import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { AddFormComponent } from '../add-form/add-form.component';
import { HttpService } from '../../services/http/http.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-controltest',
  templateUrl: './controltest.component.html',
  styleUrls: ['./controltest.component.scss']
})
export class ControltestComponent implements OnInit {
  displayedColumns = [ 'action', 'controltest','typeofparam','unit','frequency','controlmethod','status'];
  recordList: Records[] = [];
  dataSource = new MatTableDataSource<Records>(this.recordList);
  constructor(private dialog: MatDialog,
    private httpService: HttpService,
    private snackbar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getRecords();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddFormComponent, {
       width:'700px' 
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.postNewRecord(result);
      this.getRecords();
    })
  }

  postNewRecord(result) {
    this.spinnerService.show();

    var data = {
      parameter_name:result.control,
      parameter_unit:result.unit,
      control_method:result.controlmethod,
      verification_frequency:result.frequency,
      parameter_type:result.typeofparameter,
      is_active:result.status,

      parameter_short_name:result.shortname,
    }
    
    var contentBody = {url: '/parameters', body:data};
    this.httpService.httpPost(contentBody, false).subscribe(response => {
      console.log("success ", response);
      this.openSnackBar(response["message"]);
      this.spinnerService.hide();

    }, error => {
      console.log("error ", error);
      this.spinnerService.hide();
      this.openSnackBar(error.error.message);
    })
  }
  
  getRecords() {
    this.spinnerService.show();

    var contentBody = { url: "/parameters", body: {} }
    this.httpService.httpGet(contentBody).subscribe(response => {
      console.log("success ", response);
      this.recordList = response.data;
      this.dataSource = new MatTableDataSource(this.recordList);

      this.spinnerService.hide();
      // this.openSnackBar(response["message"]);
  
    }, error => {
      console.log("error ", error);
      this.spinnerService.hide();
      this.openSnackBar(error.message);
    })
  }
  openSnackBar(message: string) {
    this.snackbar.open(message, null, {
      duration: 2000
    });
   }
}
export interface Records {
action;
controlTest;
typeOfParam;
paramShortName;
unit1;
verificationFreq;
controlMethod;
status;
}
