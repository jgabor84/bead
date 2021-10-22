import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Wine } from '../models/wine.model';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-wine',
  templateUrl: './edit-wine.component.html',
  styleUrls: ['./edit-wine.component.css']
})
export class EditWineComponent implements OnInit {
  wine: Wine;
  errorMessage: string;
  successMessage: string;
  filename: any = null;

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:4200/api/upload',
    itemAlias: 'image'
  });

  wineForm: FormGroup = this.formBuilder.group({
    id:null,
    name: null, 
    imgs:null,
    winery: null,
    description: null,
    type: null,
    year: null,
    alcohol: null,
    color: null,
    sku: null,
    price: null,
    discount: null,
    quantity: null,
    shop: null,
    landing:null,
    createTime:  null,
    updateTime:  null
  });
  isSuccessful = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);

    
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    
    this.wine = await this.userService.getWineById(id);
    this.filename = this.wine.imgs;
    console.log(JSON.stringify(this.wine));
    this.wineForm.setValue(this.wine);
  }


  onFileSelected () {
    this.uploader.uploadAll();
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    console.log(data);
    this.filename = data.file;
  }

  editWine():void{
    const wine = this.wineForm.getRawValue();
    
    
    wine.updateTime = new Date();
    console.log("submit");

    try {
      this.userService.addWine(wine);
      this.isSuccessful = true;
      console.log(JSON.stringify(wine));
    } catch (error) {
      console.log(error);
    }
  }
  

}
