import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Diagnose, Disease, Employee, HttpClientService } from '../service/httpclient.service';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-perioform',
  templateUrl: './perioform.component.html',
  styleUrls: ['./perioform.component.css']
})
export class PerioformComponent implements OnInit {

  id:Number;
  name:string;
  dname:Disease;
  diag:Diagnose = new Diagnose("","","","","",null,"",0);
  constructor(public activatedRoute: ActivatedRoute,private httpClientService:HttpClientService,
    private loginService:AuthenticationService) { }

  download(){
    const options={
      name:'output.pdf',
      image:{ type:'jpeg'},
      html2canvas:{},
      jsPDF:{orientation:'landscape'}
    }
    const element: Element= document.getElementById('table')
    html2pdf()
        .from(element)
        .set(options)
        .save()
  }

ngOnInit() 
{
  this.activatedRoute.params.subscribe(params => 
    {
      this.id = params['id'];
      this.name = params['name'];
    });

  this.httpClientService.getDiseases().subscribe
  (
    response =>this.handleSuccessfulResponse(response),
  );
}

handleSuccessfulResponse(response)
{
   this.dname=response;
}

setChangeHandler(event:any)
{
  this.diag.disease_name=event.target.value;
}

createDiagnose():void
{
  this.diag.patient_ID=this.id;
  this.httpClientService.savediag(this.diag)
        .subscribe( data => { alert("Diagnose Row created successfully.");
        });
}

}