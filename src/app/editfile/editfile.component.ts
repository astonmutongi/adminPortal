import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingService, ListingView } from '../services/listing.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editfile',
  templateUrl: './editfile.component.html',
  styleUrls: ['./editfile.component.css']
})
export class EditfileComponent implements OnInit {
  listingForm: FormGroup;
  loading = false;
  Data: ListingView[];  
  DataResponse: ListingView;
  listingId: string = ""; 
  SERVER_URL = this.listingService.apiBaseURL + "Listing/listingsave";
  SERVER_URL_GET = this.listingService.apiBaseURL + "Listing/ListingDetails";
  constructor(private listingService: ListingService, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router,) { 
    this.listingForm = this.formBuilder.group ({
      listingId: ['00000000-0000-0000-0000-000000000000'],
      title: [''],
      description: [''],
      price: [0],
      points:[0],
      ownerId:['00000000-0000-0000-0000-000000000000'],
      recordStatus: [1]     
    });


  }

  ngOnInit(): void {
    var state = history.state;
   
    if(state.listingId && state.listingId.length > 0) {
      this.listingId = state.listingId;

      var formData = new FormData();
      formData.append("listingId", this.listingId);
      this.httpClient.post<any>(this.SERVER_URL_GET, formData).subscribe(
        (res) => { this.DataResponse = res; 
          this.listingForm = this.formBuilder.group ({
            listingId: this.DataResponse.listingId,
            title: this.DataResponse.title,
            description: this.DataResponse.description,
            price: this.DataResponse.price,
            points:0,
            ownerId:['00000000-0000-0000-0000-000000000000'],
            recordStatus: 0 
          });            
          this.loading = false;         
        },
        (err) =>{ console.log(err);this.loading = false;} 
      );

    }else{
      this.router.navigate(['./filemanagement']);

    }
  }

  onSubmit() {
    this.loading = true;
    var formData = new FormData();
    formData.append("title", this.listingForm.get('title').value);
    formData.append("listingId", this.listingId);
    formData.append("description", this.listingForm.get('description').value);
    formData.append("price", this.listingForm.get('price').value);
    formData.append("points", this.listingForm.get('points').value);
    formData.append("ownerId", this.listingForm.get('ownerId').value);    
    formData.append("recordStatus", '0');    
  
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => { this.DataResponse = res;        
        this.loading = false;
        alert("Video Details Successfully updated");
      },
      (err) =>{ console.log(err);this.loading = false;} 
    );
  }

  onDelete() { 
    this.loading = true;
    var formData = new FormData();
    formData.append("title", this.listingForm.get('title').value);
    formData.append("listingId", this.listingId);
    formData.append("description", this.listingForm.get('description').value);
    formData.append("price", this.listingForm.get('price').value);
    formData.append("points", this.listingForm.get('points').value);
    formData.append("ownerId", this.listingForm.get('ownerId').value);    
    formData.append("recordStatus", '1');    
  
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => { this.DataResponse = res;         
       
        this.loading = false;
        alert("Video Deleted Successfully");
        this.router.navigate(['./filemanagement']);
      },
      (err) =>{ console.log(err);this.loading = false;} 
    );
  }

}
