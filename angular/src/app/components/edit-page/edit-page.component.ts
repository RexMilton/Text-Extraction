import { Component, Directive, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable, first, map, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { CustomValidators } from './Validators/noSpaceAllowed.validator';



@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})


export class EditPageComponent implements OnInit{
  // private baseUrl = 'http://localhost:5000/api/person/';
  
  //Input from the parent component
  @Input() resultData: any;
  @Input() formCount : any;

  constructor(private _snackBar: MatSnackBar, private http: HttpClient,private router:Router) {  }
  
  // getPerson(personId: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}${personId}`);
  // }

  title = 'template-driven-form';
  formStatus: string = '';
  reactiveForm!: FormGroup;
  formdata: any = {};
  showLoader: boolean = false;

  personId = 1; // Initial person ID
  personDetails: any;

  ngOnChanges() {
    console.log(this.resultData);
    console.log(this.formCount);
    this.formdata = this.resultData;
    this.initializeForm();
    this.patchfunc();
  }
  
  ngOnInit() : void {
    this.initializeForm();
    this.formdata = this.resultData;
  }
  initializeForm(){
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      contact: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}$')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      media : new FormArray([
        new FormControl(null,Validators.required)
      ]),
      hobbies: new FormArray([
        new FormControl(null)
      ]),
      technicalskills : new FormArray([
        new FormControl(null)
      ]),
      interpersonalskills : new FormArray([
        new FormControl(null)
      ]),
      areaofinterest : new FormArray([
        new FormControl(null)
      ]),
      experience: new FormArray([
        new FormGroup({
          company: new FormControl(null),
          designation: new FormControl(null),
          duration: new FormControl(null),
          description: new FormControl(null),
        })
      ]),
      projects : new FormArray([
        new FormGroup({
          projectname: new FormControl(null),
          client: new FormControl(null),
          duration: new FormControl(null),
          description: new FormControl(null),
        })
      ]),
      education : new FormArray([
        new FormGroup({
          university: new FormControl(null),
          qualification: new FormControl(null),
          cgpa: new FormControl(null),
          yearofcompletion: new FormControl(null),
        })
      ]),
      certification : new FormArray([
        new FormGroup({
          name: new FormControl(null),
          issuer: new FormControl(null)
        })
      ])
    })

  }
  patchfunc(){
    for(let i=1;i<this.formdata['media'].length;i++){
      (<FormArray>this.reactiveForm.get('media')).push(new FormControl(null,Validators.required));
    }
    for(let i=1;i<this.formdata['hobbies'].length;i++){
      (<FormArray>this.reactiveForm.get('hobbies')).push(new FormControl(null, Validators.required));
    }
    for(let i=1;i<this.formdata['technicalskills'].length;i++){
      (<FormArray>this.reactiveForm.get('technicalskills')).push(new FormControl(null));
    }
    for(let i=1;i<this.formdata['interpersonalskills'].length;i++){
      (<FormArray>this.reactiveForm.get('interpersonalskills')).push(new FormControl(null));
    }
    for(let i=1;i<this.formdata['areaofinterest'].length;i++){
      (<FormArray>this.reactiveForm.get('areaofinterest')).push(new FormControl(null));
    }
    for(let i=1;i<this.formdata['experience'].length;i++){
      const frmgroup = new FormGroup({
        company: new FormControl(null),
        designation: new FormControl(null),
        duration: new FormControl(null),
        description: new FormControl(null)
      });
      (<FormArray>this.reactiveForm.get('experience')).push(frmgroup);
    }
    for(let i=1;i<this.formdata['projects'].length;i++){
      const frmgroup = new FormGroup({
        projectname: new FormControl(null),
        client: new FormControl(null),
        duration: new FormControl(null),
        description: new FormControl(null)
      });
      (<FormArray>this.reactiveForm.get('projects')).push(frmgroup);
    }
    for(let i=1;i<this.formdata['education'].length;i++){
      const frmgroup = new FormGroup({
        university: new FormControl(null),
        qualification: new FormControl(null),
        cgpa: new FormControl(null),
        yearofcompletion: new FormControl(null)
      });
      (<FormArray>this.reactiveForm.get('education')).push(frmgroup);
    }
    for(let i=1;i<this.formdata['certification'].length;i++){
      const frmgroup = new FormGroup({
        name: new FormControl(null),
        issuer: new FormControl(null)
      });
      (<FormArray>this.reactiveForm.get('certification')).push(frmgroup);
    }
    
    setTimeout(() =>{
    this.reactiveForm.patchValue({
        name : this.formdata["name"],
        contact : this.formdata["contact"],
        email : this.formdata['email'],
        media : this.formdata['media'],
        hobbies : this.formdata['hobbies'],
        experience : this.formdata['experience'],
        projects : this.formdata['projects'],
        education : this.formdata['education'],
        certification : this.formdata['certification'],
        technicalskills : this.formdata['technicalskills'],
        interpersonalskills : this.formdata['interpersonalskills'],
        areaofinterest : this.formdata['areaofinterest']
      });
      this.reactiveForm.updateValueAndValidity();
    },);
  }

  OnFormSubmitted(){
    console.log(this.reactiveForm.value);
    this.showLoader = true;
      let url = "http://localhost:5000/api/submit_data"
      // const jsondata = JSON.stringify(this.reactiveForm, (key, value) => {
      //   if (key === '_parent') return undefined;
      //   return value;
      // });
      const json_data = JSON.stringify(this.reactiveForm.value);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(url, json_data , {headers}).subscribe((res) => {
        this.showLoader = false;
        this._snackBar.open("Data is stored in DataBase Successfully", "Ok", { duration: 5000 });

        // console.log(res);
      },
        (error) => {
          this.showLoader = false;
          this._snackBar.open(error.message, "Close", { duration: 5000 });
        });
  }

  Addhobbies(){
    (<FormArray>this.reactiveForm.get('hobbies'))
      .push(new FormControl(null, Validators.required));
  }

  Deletehobbies(index: number){
    const controls = <FormArray>this.reactiveForm.get('hobbies');
    controls.removeAt(index);
  }

  AddMediaProfile(){
    const frmctrl = new FormControl(null);
    (<FormArray>this.reactiveForm.get('media')).push(frmctrl);
  }

  DeleteMediaProfile(index: number){
    const ctrl = <FormArray>this.reactiveForm.get('media');
    ctrl.removeAt(index);
  }

  AddTechnicalSkills(){
    (<FormArray>this.reactiveForm.get('technicalskills')).push(new FormControl);
  }

  DeleteTechnicalSkills(index: number){
    const frmArray = <FormArray>this.reactiveForm.get('technicalskills');
    frmArray.removeAt(index);
  }

  AddInterpersonalSkills(){
    (<FormArray>this.reactiveForm.get('interpersonalskills')).push(new FormControl);
  }

  DeleteInterpersonalSkills(index: number){
    const frmArray = <FormArray>this.reactiveForm.get('interpersonalskills');
    frmArray.removeAt(index);
  }

  AddAreaOfInterest(){
    (<FormArray>this.reactiveForm.get('areaofinterest')).push(new FormControl);
  }

  DeleteAreaOfInterest(index: number){
    const frmArray = <FormArray>this.reactiveForm.get('areaofinterest');
    frmArray.removeAt(index);
  }

  AddExperience(){
    const frmgroup = new FormGroup({
      company: new FormControl(null),
      designation: new FormControl(null),
      duration: new FormControl(null),
      description: new FormControl(null),
    });

    (<FormArray>this.reactiveForm.get('experience')).push(frmgroup);
  }

  DeleteExperience(index: number){
    const frmArray = <FormArray>this.reactiveForm.get('experience');
    frmArray.removeAt(index);
  }

  AddProjects(){
    const frmgroup = new FormGroup({
      projectname: new FormControl(null),
      client: new FormControl(null),
      duration: new FormControl(null),
      description: new FormControl(null),
    });

    (<FormArray>this.reactiveForm.get('projects')).push(frmgroup);
  }

  DeleteProjects(index: number){
    const frmArray = <FormArray>this.reactiveForm.get('projects');
    frmArray.removeAt(index);
  }

  AddQualification(){
    const frmgroup = new FormGroup({
      university: new FormControl(null),
      qualification: new FormControl(null),
      cgpa: new FormControl(null),
      yearofcompletion: new FormControl(null),
    });

    (<FormArray>this.reactiveForm.get('education')).push(frmgroup);
  }

  DeleteQualification(index: number){
    const frmArray = <FormArray>this.reactiveForm.get('education');
    frmArray.removeAt(index);
  }

  AddCertification(){
    const frmgroup = new FormGroup({
      name: new FormControl(null),
      issuer: new FormControl(null)
    });

    (<FormArray>this.reactiveForm.get('certification')).push(frmgroup);
  }

  DeleteCertification(index: number){
    const frmArray = <FormArray>this.reactiveForm.get('certification');
    frmArray.removeAt(index);
  }
}