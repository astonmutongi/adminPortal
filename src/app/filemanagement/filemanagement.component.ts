import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingService, ListingView } from '../services/listing.service';
import { HttpClient } from '@angular/common/http';



export interface userFile{
  video:File,
  thumb:File
}
@Component({
  selector: 'app-filemanagement',
  templateUrl: './filemanagement.component.html',
  styleUrls: ['./filemanagement.component.css']
})
export class FileManagementComponent implements OnInit {
  listingForm: FormGroup;
  Data: ListingView[];  
  DataResponse: ListingView[];
  files:File[] =[];
  currentVideo:File;
  cover:File;
  uploadfiles: userFile[] = [];
  SERVER_URL = this.listingService.apiBaseURL + "Listing/listingcreate";
  uploadForm: FormGroup; 
  loading = false;
  constructor(private listingService: ListingService, private formBuilder: FormBuilder, private httpClient: HttpClient) { 
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

  ngOnInit() {  
    this.loading = true;
    this.listingService.getUsers().subscribe((res) => {
          this.DataResponse = res;
         
          this.loading = false;
        }, error => {
          console.log(error);
          this.loading = false;
        })
 
  }

uploadFile(event) { 
  const files = (event.target as HTMLInputElement).files;
  var that = this;
  for (var i = 0; i < files.length; i++) {   
  //  this.files.push(files[i]);
    that.currentVideo = files[i];
    var thumb = this.getVideoCover(files[i],  3).then(function(response){
        that.uploadfiles.push({video: that.currentVideo,
        thumb:<File>response});
      }      
    );
   // console.log(that.uploadfiles);
  }
}

uploadCover(event) { 
  this.cover = (event.target as HTMLInputElement).files[0];  
}

onSubmit() {
  this.loading = true;
  var formData = new FormData();
  formData.append("title", this.listingForm.get('title').value);
  formData.append("listingId", this.listingForm.get('listingId').value);
  formData.append("description", this.listingForm.get('description').value);
  formData.append("price", this.listingForm.get('price').value);
  formData.append("points", this.listingForm.get('points').value);
  formData.append("ownerId", this.listingForm.get('ownerId').value);
  formData.append("recordStatus", '0'); 
  formData.append("cover", this.cover); 

  for (var i = 0; i < this.uploadfiles.length; i++) {
    formData.append("video_" + i, this.uploadfiles[i].video);
    formData.append("thumb_" + i, this.uploadfiles[i].thumb);
  }

  this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
    (res) => { this.DataResponse = res; 
      this.listingForm = this.formBuilder.group ({
        listingId: ['00000000-0000-0000-0000-000000000000'],
        title: [''],
        description: [''],
        price: [0],
        points:[0],
        ownerId:['00000000-0000-0000-0000-000000000000'],
        recordStatus: [1]     
      });   
      this.cover = null;
      this.uploadfiles = [];
      this.loading = false;
      alert("Video Successfully uploaded");
    },
    (err) =>{ console.log(err);this.loading = false;} 
  );
}

createImgPath = (serverPath: string) => {
  return `${this.listingService.apiBaseURL}${serverPath}`;
}

 getVideoCover(file, seekTo = 0.0) { 
  return new Promise((resolve, reject) => {
      // load the file to a video player
      const videoPlayer = document.createElement('video');
      videoPlayer.setAttribute('src', URL.createObjectURL(file));
      videoPlayer.load();
      videoPlayer.addEventListener('error', (ex) => {
          reject("error when loading video file");
      });
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener('loadedmetadata', () => {
          // seek to user defined timestamp (in seconds) if possible
          if (videoPlayer.duration < seekTo) {
              reject("video is too short.");
              return;
          }
          // delay seeking or else 'seeked' event won't fire on Safari
          setTimeout(() => {
            videoPlayer.currentTime = seekTo;
          }, 200);
          // extract video thumbnail once seeking is complete
          videoPlayer.addEventListener('seeked', () => {            
              // define a canvas to have the same dimension as the video
              const canvas = document.createElement("canvas");
              canvas.width = videoPlayer.videoWidth;
              canvas.height = videoPlayer.videoHeight;
              // draw the video frame to canvas
              const ctx = canvas.getContext("2d");
              ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
              // return the canvas image as a blob
              ctx.canvas.toBlob(
                  blob => {
                      resolve(blob);
                  },
                  "image/jpeg",
                  0.75 /* quality */
              );
          });
      });
  });
}






}
