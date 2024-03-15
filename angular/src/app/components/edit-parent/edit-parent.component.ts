import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-edit-parent',
  // standalone: true,
  // imports: [],
  templateUrl: './edit-parent.component.html',
  styleUrl: './edit-parent.component.scss'
})

export class EditParentComponent implements OnInit{
  count: any = '1';

  constructor(private http: HttpClient,private router:Router) {  }
  formdata: any = null;
  sendData : any;
  formLength: any  = 1;
  ngOnInit() : void{

    let url = "http://localhost:5000/api/get_data"
    this.http.get<any>(url).pipe( first(), map((data) => {
      console.log(data);
      this.formdata = data;
      this.sendData = data['1'];
      this.formLength = Object.keys(data).length;
      })).subscribe(
      (data) => console.log("Data updated successfully!"),
      (error) => console.error(error)
    );
    console.log(this.formdata);
    // this.formLength = this.formdata.length;
    // console.log(this.formLength);
  }
  
  showPrevResume(){
    let temp : number = parseInt(this.count);
    if (temp <= 1){
      temp = 1;
      this.count = temp.toString();
    }
    else{
      this.count = (temp-1).toString();
    }
    this.sendData =  this.formdata[this.count];
    console.log(this.count);
  }
  showNextResume(){
    let temp : number = parseInt(this.count);
    if(temp >= this.formLength){
      temp = this.formLength;
      this.count = temp.toString();
    }
    else{
      this.count = (temp + 1).toString();
    }
    this.sendData =  this.formdata[this.count];
    console.log(this.count);
  }
}
