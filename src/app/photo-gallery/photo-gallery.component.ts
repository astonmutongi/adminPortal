import { Component, OnInit } from '@angular/core';
import { ListingService, ListingView } from '../services/listing.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})

export class PhotoGalleryComponent implements OnInit {
 Data: ListingView[];  
  DataResponse: ListingView[];
  constructor(private listingService: ListingService) { }
  ngOnInit() {
    this.listingService.getUsers().subscribe((res) => {
          this.DataResponse = res;
        }, error => {
          console.log(error);
        })
  }
}