import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Carousel } from '../models/carousel.model';
import { FormBuilder,FormGroup } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-carousel',
  templateUrl: './manage-carousel.component.html',
  styleUrls: ['./manage-carousel.component.css']
})
export class ManageCarouselComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:4200/api/upload',
    itemAlias: 'image'
  });

  carouselForm: FormGroup = this.formBuilder.group({
    text:null,
    img:null,
    active: null,
    link: null
  });

  carousel:Carousel[];
  filename: any = null;
  isSuccessful = false;
  position: any[] = [];

  constructor(private userService:UserService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);



  }

  onFileSelected () {
    this.uploader.uploadAll();
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    console.log(data);
    this.filename = data.file;
  }
    async onSubmit(): Promise<void> {

      try {
        //lekérjük az utolsó id-t, és ebből hozzuk létre a pozíciót
        this.userService.getMaxId().subscribe(
          value => {
            const carousel = this.carouselForm.getRawValue();
      carousel.active = true;
      carousel.img = this.filename;
            this.position = value; 

            carousel.position =Number(Object.values(this.position))+1;
            console.log("position: " +JSON.stringify(this.position));
            this.userService.addCarousel(carousel);
        this.isSuccessful = true;
        console.log(JSON.stringify(carousel));
            
            console.log('maxid', this.position);
          },
          err => {
            console.log('##Error', err)
          }
        );
 
      } catch (error) {
        console.log(error);
      }
  
    }


}
